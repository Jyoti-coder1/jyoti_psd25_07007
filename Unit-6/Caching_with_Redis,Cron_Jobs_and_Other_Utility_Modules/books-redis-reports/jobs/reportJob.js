const cron = require('node-cron');
const { redisClient } = require('../services/redisClient');
const { generateReportStream } = require('../utils/pdfGenerator');
const { sendMail } = require('../services/emailService');
const User = require('../models/User');

function startReportJob() {
    cron.schedule('*/5 * * * *', async () => {
        console.log('[CronReport] started');
        try {
            const keys = await redisClient.keys('bulkstatus:*');
            if (!keys.length) {
                console.log('[CronReport] nothing to report');
                return;
            }
            for (const key of keys) {
                try {
                    const data = await redisClient.get(key);
                    if (!data) { await redisClient.del(key); continue; }
                    const statusObj = JSON.parse(data);
                    const userId = statusObj.userId;
                    const user = await User.findById(userId);
                    if (!user) {
                        console.warn(`[CronReport] user ${userId} not found, deleting status`);
                        await redisClient.del(key);
                        continue;
                    }

                    const { stream, filename } = generateReportStream(statusObj);
                    const attachments = [{ filename, content: stream }];

                    const subject = 'Bulk Books Insertion Report';
                    const text = `Hello ${user.name}, please find attached the bulk insertion report.`;
                    await sendMail({ to: user.email, subject, text, attachments });
                    console.log(`[CronReport] report emailed to ${user.email}`);

                    await redisClient.del(key);
                } catch (err) {
                    console.error('[CronReport] error processing key', key, err);
                }
            }
        } catch (err) {
            console.error('[CronReport] job error', err);
        }
    }, { timezone: 'UTC' });

    console.log('[CronReport] scheduled every 5 minutes');
}

module.exports = { startReportJob };