const bookModel = require("../models/bookModel");

async function returnCheckMiddleware(req, res, next) {
    const id = Number(req.params.id);
    const book = await bookModel.getBookById(id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    if (!book.borrowedDate) return res.status(400).json({ error: "Book is not borrowed" });

    const borrowedDate = new Date(book.borrowedDate);
    const now = new Date();
    const diffDays = (now - borrowedDate) / (1000 * 60 * 60 * 24);
    if (diffDays < 3) {
        return res.status(400).json({ error: "Book cannot be returned within 3 days of borrowing." });
    }
    next();
}

module.exports = returnCheckMiddleware;