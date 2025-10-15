const Book = require('../models/Book');
const { redisClient } = require('../services/redisClient');

exports.enqueueBulkBooks = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { books } = req.body;
        if (!Array.isArray(books) || books.length === 0) {
            return res.status(400).json({ message: 'books must be a non-empty array' });
        }
        const key = `bulkbooks:${userId}`;
        const pipeline = redisClient.multi();
        books.forEach(b => pipeline.rPush(key, JSON.stringify(b)));
        pipeline.expire(key, 24 * 60 * 60);
        await pipeline.exec();
        console.log(`Enqueued ${books.length} books for user ${userId}`);
        return res.json({ message: 'Bulk books queued. Will be processed by cron job.' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};