const Book = require('../models/Book');
const { redisClient } = require('../services/redisClient');

const CACHE_TTL = parseInt(process.env.CACHE_TTL || '120', 10);

const booksCacheKey = (userId) => `books: ${userId}`;
const bulkKey = (userId) => `bulkbooks: ${userId}`;

exports.getBooks = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const key = booksCacheKey(userId);
        const cached = await redisClient.get(key);
        if (cached) {
            console.log(`[Cache] hit for ${key}`);
            return res.json(JSON.parse(cached));
        }
        console.log(`[Cache] miss for ${key}`);
        const books = await Book.find({ createdBy: userId }).lean();
        await redisClient.setEx(key, CACHE_TTL, JSON.stringify(books));
        return res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createBook = async (req, res) => {
    try {
        const userId = req.user._id;
        const { title, author, description } = req.body;
        const book = await Book.create({ title, author, description, createdBy: userId });
        await redisClient.del(booksCacheKey(userId.toString()));
        res.status(201).json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { id } = req.params;
        const book = await Book.findOneAndUpdate({ _id: id, createdBy: userId }, req.body, { new: true });
        if (!book) return res.status(404).json({ message: 'Book not found or not yours' });
        await redisClient.del(booksCacheKey(userId));
        res.json(book);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const { id } = req.params;
        const book = await Book.findOneAndDelete({ _id: id, createdBy: userId });
        if (!book) return res.status(404).json({ message: 'Book not found or not yours' });
        await redisClient.del(booksCacheKey(userId));
        res.json({ message: 'Deleted', book });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.bulkUpload = async (req, res) => {
    try {
        const userId = req.user._id.toString();
        const booksArray = req.body.books;
        if (!Array.isArray(booksArray) || booksArray.length === 0) {
            return res.status(400).json({ message: 'books must be a non-empty array' });
        }
        const key = bulkKey(userId);
        const pipeline = redisClient.multi();
        booksArray.forEach(book => {
            pipeline.rPush(key, JSON.stringify(book));
        });
        pipeline.expire(key, 24 * 60 * 60);
        await pipeline.exec();
        console.log(`Stored ${booksArray.length} books for user ${userId} in Redis key ${key}`);
        return res.json({ message: 'Books will be added later' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};