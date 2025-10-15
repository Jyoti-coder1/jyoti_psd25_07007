const express = require('express');
const router = express.Router();
const { enqueueBulkBooks } = require('../controllers/books.controller');
const auth = require('../middleware/simpleAuth');

router.post('/bulk', auth, enqueueBulkBooks);

module.exports = router;