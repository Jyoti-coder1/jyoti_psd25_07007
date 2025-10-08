const express = require("express");
const { BookModel } = require("../models/book.model");
const { MemberModel } = require("../models/member.model");

const bookRouter = express.Router();

bookRouter.post("/add-book", async (req, res) => {
    try {
        const book = new BookModel(req.body);
        await book.save();
        res.status(201).json({ message: "Book added successfully", book });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

bookRouter.post("/borrow-book", async (req, res) => {
    try {
        const { memberId, bookId } = req.body;
        const book = await BookModel.findById(bookId);
        const member = await MemberModel.findById(memberId);

        if (!book || !member) return res.status(404).json({ message: "Not found" });
        if (book.status === "borrowed") return res.status(400).json({ message: "Book already borrowed" });

        book.status = "borrowed";
        book.borrowers.push(memberId);
        member.borrowedBooks.push(bookId);

        await book.save();
        await member.save();

        res.json({ message: "Book borrowed successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

bookRouter.post("/return-book", async (req, res) => {
    try {
        const { memberId, bookId } = req.body;

        const book = await BookModel.findById(bookId);
        const member = await MemberModel.findById(memberId);

        if (!book || !member) return res.status(404).json({ message: "Not found" });

        book.borrowers.pull(memberId);
        member.borrowedBooks.pull(bookId);

        if (book.borrowers.length === 0) book.status = "available";

        await book.save();
        await member.save();

        res.json({ message: "Book returned successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

bookRouter.get("/book-borrowers/:bookId", async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.bookId).populate("borrowers");
        if (!book) return res.status(404).json({ message: "Book not found" });
        res.json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

bookRouter.put("/update-book/:bookId", async (req, res) => {
    try {
        const updatedBook = await BookModel.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
        res.json({ message: "Book updated", updatedBook });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

bookRouter.delete("/delete-book/:bookId", async (req, res) => {
    try {
        const book = await BookModel.findById(req.params.bookId);
        if (!book) return res.status(404).json({ message: "Book not found" });

        await MemberModel.updateMany({ borrowedBooks: book._id }, { $pull: { borrowedBooks: book._id } });

        await BookModel.findByIdAndDelete(book._id);
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = { bookRouter };