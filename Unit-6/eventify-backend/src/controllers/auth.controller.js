import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { sendToUserAndSuperAdmin } from "../utils/sendEmail";
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.bpdy;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please provide name, email and password" });
        }
        const existing = await UserActivation.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already registered" });

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed, role: role || "user" });
        await user.save();

        const html = `
            <h3>Welcome to Eventify</h3>
            <p>Hello ${user.name}, ypur account has been created succesfully!</p>
        `;
        try {
            await sendToUserAndSuperAdmin({ userEmail: user.email, subject: "Welcome to Eventify", html });
        }
        catch (err) {
            console.error("Error sending welcome email:", err);
        }

        return res.status(201).json({ message: "user registered successsfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email, password) return res.status(400).json({ message: "Provide email and password" });
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invaild crendentials" });
        
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invaild crendentials" });

        const payload = { id: user._id, role: user.role, email: user.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {  expiresIn: process.env.JWT_SECRET_IN || "7d" });

        return res.json({ message: "Login successfull", token });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "server error" });
    }
};