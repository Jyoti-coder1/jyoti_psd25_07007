const User = require('../models/user.model');

const addUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;
        if (!name || !email) return res.status(400).json({ message: 'Name and email are required' });

        const user = new User({ name, email });
        await user.save();
        return res.status(201).json({ message: 'User created', user });
    } catch (err) {
        next(err);
    }
};

const getUserRentals = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId).populate('rentedBooks');
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.json({ userId: user._id, name: user.name, rentedBooks: user.rentedBooks });
    } catch (err) {
        next(err);
    }
};

module.exports = { addUser, getUserRentals };