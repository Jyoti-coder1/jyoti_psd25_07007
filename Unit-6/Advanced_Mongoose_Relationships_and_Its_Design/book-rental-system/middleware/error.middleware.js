const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({ message: messages });
    }

    if (err.code && err.code === 11000) {
        const key = Object.keys(err.keyValue)[0];
        return res.status(409).json({ message: `${key} already exists ` });
    }

    res.status(500).json({ message: 'Server error' });
};

module.exports = errorHandler;