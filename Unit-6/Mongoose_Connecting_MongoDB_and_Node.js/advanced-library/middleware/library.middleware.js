const Library = require('../models/library.model');

const validateBookData = (req, res, next) => {
    const { title, author } = req.body;
    if (!title || !author) {
        return res.status(400).json({ message: "Incomplete Data" });
    }
    next();
};

const checkBorrowLimit = async (req, res, next) => {
    const { borrowerName } = req.body;
    if (!borrowerName) return res.status(400).json({ message: "Borrower name required" });

    const borrowedCount = await Library.countDocuments({ borrowerName, status: "borrowed" });
    if (borrowedCount >= 3) {
        return res.status(409).json({ message: "Borrowing limit exceeded (max 3 books)" });
    }
    next();
};

module.exports = { validateBookData, checkBorrowLimit };