import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model";
dotenv.config();

export const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: no token provided" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(payload.id).select("-password");
        if (!user) return res.status(401).json({ message: "unauthorized: user not found" });
        req.user = user;
        next();
    }
    catch (err) {
        console.error(err);
        return res.status(401).json({ message: "unauthorized: invailed token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: insufficient role" });
        }
        next();
    };
};