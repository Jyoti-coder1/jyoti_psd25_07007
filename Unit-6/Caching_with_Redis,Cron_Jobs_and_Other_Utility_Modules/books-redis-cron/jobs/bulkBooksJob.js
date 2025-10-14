const cron = require('node-cron');
const { redisClient } = require('../services/redisClient');
const Book = require('../models/Book');

function startBulkBooksJob() {
    cron.schedule('*/2 * * * *', async () => {
        try {
            console.log('[Cron] Running bulk books job...');
            const keys = await redisClient.keys('bulkbooks:*');
            if (!keys || keys.length === 0) {
                console.log('[Cron] No pending bulk jobs');
                return;
            }

            for (const key of keys) {
                try {
                    const parts = key.split(':');
                    const userId = parts[1];
                    const list = await redisClient.lRange(key, 0, -1);
                    if (!list || list.length === 0) {
                        await redisClient.del(key);
                        continue;
                    }
                    const docs = list.map(s => {
                        const obj = JSON.parse(s);
                        return { ...obj, createdBy: userId };
                    });
                    const inserted = await Book.insertMany(docs);
                    console.log(`[Cron] Inserted ${inserted.length} books for user ${userId}`);

                    await redisClient.del(key);

                    const cacheKey = `books: ${userId}`;
                    await redisClient.del(cacheKey);
                } catch (innerErr) {
                    console.error(`[Cron] Failed processing key ${key}`, innerErr);               
                }
            }
        } catch (err) {
            console.error('[Cron] Job error', err);
        }
    }, { timezone: 'UTC' });

    console.log('[Cron] Bulk books job scheduled (every 2 minutes)');
}

module.exports = { startBulkBooksJob };