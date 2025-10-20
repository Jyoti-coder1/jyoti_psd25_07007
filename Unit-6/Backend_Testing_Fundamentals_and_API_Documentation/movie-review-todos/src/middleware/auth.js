const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

module.exports = function (req, res, next) {
    const header = req.header("Authorization") || "";
    const token = header.replace("Bearer ", "").trim();
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};