const bookModel = require("../models/bookModel");

async function addBook(req, res, next) {
    try {
        const { title, author, genre, publishedYear } = req.body;
        if (!title || !author || !genre || !publishedYear) {
            return res.status(400).json({ error: "All book fields are required" });
        }
        const book = await bookModel.createBook({ title, author, genre, publishedYear });
        res.status(201).json(book);
    } catch (err) { next(err); }
}

async function getAllBooks(req, res, next) {
    try { const books = await bookModel.getAllBooks(); res.json(books); }
    catch (err) { next(err); }
}

async function updateBook(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { title, author, genre, publishedYear } = req.body;
        const updated = await bookModel.updateBook(id, { title, author, genre, publishedYear });
        if (!updated) return res.status(404).json({ error: "Book not found" });
        res.json(updated);
    } catch (err) { next(err); }
}

async function deleteBook(req, res, next) {
    try {
        const id = Number(req.params.id);
        const ok = await bookModel.deleteBook(id);
        if (!ok) return res.status(404).json({ error: "Book not found" });
        res.status(204).send();
    } catch (err) { next(err); }
}

module.exports = { addBook, getAllBooks, updateBook, deleteBook };