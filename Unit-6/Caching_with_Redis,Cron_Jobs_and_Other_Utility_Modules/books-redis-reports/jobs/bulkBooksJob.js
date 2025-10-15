const cron = require('node-cron');
const { redisClient } = require('../services/redisClient');
const Book = require('../models/Book');

function startBulkBooksJob() {
    cron.schedule('*/2 * * * *', async () => {
        console.log('[CronBulk] started');
        try {
            const keys = await redisClient.keys('bulkbooks:*');
            if (!keys.length) {
                console.log('[CronBulk] no pending bulk jobs');
                return;
            }
            for (const key of keys) {
                try {
                    const userId = key.split(':')[1];
                    const items = await redisClient.lRange(key, 0, -1);
                    if (!items || items.length === 0) {
                        await redisClient.del(key);
                        continue;
                    }
                    const docs = items.map(s => JSON.parse(s).title ? JSON.parse(s) : JSON.parse(s));
                    const failures = [];
                    const insertDocs = docs.map(d => ({ ...d, createdBy: userId }));
                    try {
                        const inserted = await Book.insertMany(insertDocs, { ordered: false });
                        const insertedCount = inserted.length || 0;

                        const status = {
                            userId,
                            insertedCount,
                            failedCount: 0,
                            failures: [],
                            processedAt: Date.now()
                        };
                        await redisClient.set(`bulkstatus:${userId}`, JSON.stringify(status), { EX: 24 * 60 * 60 });
                        console.log(`[CronBulk] inserted ${insertedCount} for user ${userId}`);
                    } catch (bulkErr) {

                        const writeErrors = bulkErr && bulkErr.writeErrors ? bulkErr.writeErrors : [];
                        const failedCount = writeErrors.length;
                        const insertedCount = items.length - failedCount;
                        const failuresArr = writeErrors.map(w => ({ item: w.getOperation(), reason: w.errmsg || w.err }));
                        const status = {
                            userId,
                            insertedCount,
                            failedCount,
                            failures: failuresArr,
                            processedAt: Date.now()
                        };
                        await Book.insertMany(insertDocs, { ordered: false }).catch(() => { });
                        await redisClient.set(`bulkstatus:${userId}`, JSON.stringify(status), { EX: 24 * 60 * 60 });
                        console.log(`[CronBulk] partial insert for user ${userId}: inserted ${insertedCount}, failed ${failedCount}`);
                    }

                    await redisClient.del(key);
                    await redisClient.del(`books:${userId}`);
                } catch (innerErr) {
                    console.error('[CronBulk] processing error for key', key, innerErr);
                }
            }
        } catch (err) {
            console.error('[CronBulk] job error', err);
        }
    }, { timezone: 'UTC' });

    console.log('[CronBulk] scheduled every 2 minutes');
}

module.exports = { startBulkBooksJob };