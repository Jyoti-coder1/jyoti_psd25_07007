const User = require('../models/user.model');

const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const user = new User({ name, email, age });
        await user.save();
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const addAddress = async (req, res) => {
    try {
        const { userId } = req.params;
        const address = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.addresses.push(address);
        await user.save();
        res.json({ message: "Address added", user });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getSummary = async (req, res) => {
    try {
        const users = await User.find();
        const totalUsers = users.length;
        const totalAddresses = users.reduce((sum, user) => sum + user.addresses.length, 0);
        const userList = users.map(user => ({
            name: user.name,
            addressCount: user.addresses.length
        }));

        res.json({ totalUsers, totalAddresses, users: userList });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.addresses.id(addressId)?.remove();
        await user.save();
        res.json({ message: "Address deleted", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createUser, addAddress, getSummary, getUserById, deleteAddress };