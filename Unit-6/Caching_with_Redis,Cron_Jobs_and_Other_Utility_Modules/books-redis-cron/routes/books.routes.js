const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const booksCtrl = require('../controllers/books.controller');

router.get('/', auth, booksCtrl.getBooks);
router.post('/', auth, booksCtrl.createBook);
router.put('/:id', auth, booksCtrl.updateBook);
router.delete('/:id', auth, booksCtrl.deleteBook);
router.post('/bulk', auth, booksCtrl.bulkUpload);

module.exports = router;