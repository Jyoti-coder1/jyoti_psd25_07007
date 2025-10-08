const express = require('express');
const router = express.Router();
const {
    addBook, rentBook, returnBook, getBookRenters,
    updateBook, deleteBook, getAllBooks
} = require('../controllers/book.controller');

router.post('/add-book', addBook);
router.post('/rent-book', rentBook);
router.post('/return-book', returnBook);
router.get('/book-renters/:bookId', getBookRenters);
router.put('/update-book/:bookId', updateBook);
router.delete('/delete-book/:bookId', deleteBook);
router.get('/books', getAllBooks);

module.exports = router;