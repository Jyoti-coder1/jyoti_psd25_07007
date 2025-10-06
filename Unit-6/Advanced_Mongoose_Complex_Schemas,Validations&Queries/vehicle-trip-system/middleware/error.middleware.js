const errorHandler = (err, req, res, next) => {
    console.error(err);
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ message: messages });
    }
    if (err.code === 11000) {
        return res.status(400).json({ message: "Duplicate registrationNumber" });
    }
    res.status(500).json({ message: "Server Error" });
};

module.exports = errorHandler;