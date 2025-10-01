const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/adminController");

router.post("/books", ctrl.addBook);
router.get("/books", ctrl.getAllBooks);
router.patch("/books/:id", ctrl.updateBook);
router.delete("/books/:id", ctrl.deleteBook);

module.exports = router;