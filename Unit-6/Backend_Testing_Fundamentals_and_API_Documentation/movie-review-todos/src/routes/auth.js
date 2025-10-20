const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../config");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!(name && email && password)) return res.status(400).json({ message: "Missing fields" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already registered" });

        const user = new User({ name, email, password });
        await user.save();

        return res.status(201).json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) return res.status(400).json({ message: "Missing fields" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const ok = await user.comparePassword(password);
        if (!ok) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;