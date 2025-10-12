const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/email');

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const user = await User.create({ name, email, password, role });
        res.status(201).json({ message: 'User registered' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.json({ message: 'If email exists, reset link sent' }); // do not disclose

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${token}`;
            await sendEmail(email, 'Reset Password', `<a href="${resetLink}">Click to reset</a>`);
        res.json({ message: 'If email exists, reset link sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user || user.resetToken !== token || user.resetTokenExpiry < Date.now())
            return res.status(400).json({ message: 'Invalid or expired token' });

        user.password = password;
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};