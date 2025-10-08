const Book = require('../models/book.model');
const User = require('../models/user.model');

const addBook = async (req, res, next) => {
    try {
        const { title, author, genre } = req.body;
        if (!title || !author) return res.status(400).json({ message: 'Title and author are required' });

        const book = new Book({ title, author, genre });
        await book.save();
        return res.status(201).json({ message: 'Book created', book });
    } catch (err) {
        next(err);
    }
};

const rentBook = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) return res.status(400).json({ message: 'userId and bookId required' });

        const [user, book] = await Promise.all([
            User.findById(userId),
            Book.findById(bookId)
        ]);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await User.findByIdAndUpdate(userId, { $addToSet: { rentedBooks: bookId } }, { new: true });
        await Book.findByIdAndUpdate(bookId, { $addToSet: { rentedBy: userId } }, { new: true });

        return res.json({ message: 'Book rented successfully' });
    } catch (err) {
        next(err);
    }
};

const returnBook = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;
        if (!userId || !bookId) return res.status(400).json({ message: 'userId and bookId required' });

        const [user, book] = await Promise.all([
            User.findById(userId),
            Book.findById(bookId)
        ]);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await User.findByIdAndUpdate(userId, { $pull: { rentedBooks: bookId } }, { new: true });
        await Book.findByIdAndUpdate(bookId, { $pull: { rentedBy: userId } }, { new: true });

        return res.json({ message: 'Book returned successfully' });
    } catch (err) {
        next(err);
    }
};

const getBookRenters = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.bookId).populate('rentedBy', 'name email');
        if (!book) return res.status(404).json({ message: 'Book not found' });
        return res.json({ bookId: book._id, title: book.title, renters: book.rentedBy });
    } catch (err) {
        next(err);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const updated = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: 'Book not found' });
        return res.json({ message: 'Book updated', book: updated });
    } catch (err) {
        next(err);
    }
};

const deleteBook = async (req, res, next) => {
    try {
        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        await Book.findByIdAndDelete(bookId);
        await User.updateMany({ rentedBooks: bookId }, { $pull: { rentedBooks: bookId } });

        return res.json({ message: 'Book deleted and user records updated' });
    } catch (err) {
        next(err);
    }
};

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

module.exports = { addBook, rentBook, returnBook, getBookRenters, updateBook, deleteBook, getAllBooks };