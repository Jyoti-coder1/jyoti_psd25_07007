const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/readerController");
const returnCheckMiddleware = require("../middlewares/returnCheckMiddleware");

router.get("/books", ctrl.getAvailableBooks);
router.post("/borrow/:id", ctrl.borrowBook);
router.post("/return/:id", returnCheckMiddleware, ctrl.returnBook);

module.exports = router;