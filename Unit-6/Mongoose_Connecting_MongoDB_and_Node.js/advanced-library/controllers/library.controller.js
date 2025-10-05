const Library = require('../models/library.model');

const addBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        const book = new Library({ title, author });
        await book.save();
        res.status(201).json({ message: "Book added successfully", book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const borrowBook = async (req, res) => {
    try {
        const book = await Library.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status !== "available") return res.status(409).json({ message: "Book is not available" });

        const { borrowerName } = req.body;
        const now = new Date();
        const due = new Date();
        due.setDate(now.getDate() + 14);

        book.status = "borrowed";
        book.borrowerName = borrowerName;
        book.borrowDate = now;
        book.dueDate = due;
        await book.save();

        res.json({ message: "Book borrowed successfully", book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const returnBook = async (req, res) => {
    try {
        const book = await Library.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status !== "borrowed") return res.status(400).json({ message: "Book is not borrowed" });

        const now = new Date();
        let overdueFees = 0;
        if (now > book.dueDate) {
            const daysLate = Math.ceil((now - book.dueDate) / (1000 * 60 * 60 * 24));
            overdueFees = daysLate * 10;
        }

        book.status = "available";
        book.returnDate = now;
        book.overdueFees = overdueFees;
        book.borrowerName = null;
        book.borrowDate = null;
        book.dueDate = null;

        await book.save();
        res.json({ message: "Book returned successfully", book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBooks = async (req, res) => {
    try {
        const { status, title } = req.query;
        let filter = {};
        if (status) filter.status = status;
        if (title) filter.title = new RegExp(title, 'i');

        const books = await Library.find(filter);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Library.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });
        if (book.status === "borrowed") return res.status(409).json({ message: "Cannot delete borrowed book" });

        await book.deleteOne();
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addBook, borrowBook, returnBook, getBooks, deleteBook };