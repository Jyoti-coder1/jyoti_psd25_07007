const bookModel = require("../models/bookModel");
const transactionLogger = require("../middlewares/transactionLogger");

async function getAvailableBooks(req, res, next) {
    try {
        const books = await bookModel.getAllBooks();
        const available = books.filter(b => b.status === "available");
        res.json(available);
    } catch (err) { next(err); }
}

async function borrowBook(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { readerName } = req.body;
        if (!readerName) return res.status(400).json({ error: "Reader name required" });

        const book = await bookModel.getBookById(id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        if (book.status === "borrowed") return res.status(400).json({ error: "Book already borrowed" });

        const updated = await bookModel.updateBook(id, {
            status: "borrowed", borrowedBy: readerName, borrowedDate: new Date().toISOString()
        });
        transactionLogger("borrowed", readerName, book.title);
        res.json(updated);
    } catch (err) { next(err); }
}

async function returnBook(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { readerName } = req.body;
        if (!readerName) return res.status(400).json({ error: "Reader name required" });

        const book = await bookModel.getBookById(id);
        if (!book) return res.status(404).json({ error: "Book not found" });
        if (book.status === "available") return res.status(400).json({ error: "Book is not borrowed" });

        const updated = await bookModel.updateBook(id, { status: "available", borrowedBy: null, borrowedDate: null });
        transactionLogger("returned", readerName, book.title);
        res.json(updated);
    } catch (err) { next(err); }
}

module.exports = { getAvailableBooks, borrowBook, returnBook };