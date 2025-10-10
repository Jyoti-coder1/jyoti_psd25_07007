const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const SALT_ROUNDS = 10;

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, password required' });
        if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'Email already registered' });

        const hashed = await bcrypt.hash(password, SALT_ROUNDS);
        const user = new User({ name, email, password: hashed });
        await user.save();

        return res.status(201).json({ message: 'User created', user: user.toJSON() });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

        const payload = { id: user._id, email: user.email, name: user.name };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h' });

        return res.json({ message: 'Login successful', token, user: user.toJSON() });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};