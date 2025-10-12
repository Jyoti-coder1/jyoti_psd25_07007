const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
        user: "ethereal_user_here",
        pass: "ethereal_pass_here"
    }
});

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashed });
        res.status(201).json({ message: "User created", userId: user._id });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(200).json({ message: "If email exists, reset link sent" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const expiry = Date.now() + 15 * 60 * 1000;
        user.resetToken = resetToken;
        user.resetTokenExpiry = expiry;
        await user.save();

        const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

            await transporter.sendMail({
                from: '"Auth System" <no-reply@example.com>',
                to: user.email,
                subject: "Password Reset",
                text: `Reset your password using this link: ${resetLink}`
    });

    res.json({ message: "If email exists, reset link sent" });
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = await User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
        if (!user) return res.status(400).json({ error: "Invalid or expired token" });

        user.password = await bcrypt.hash(password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Password reset successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};