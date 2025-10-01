function roleCheckMiddleware(allowedRoles) {
    return (req, res, next) => {
        const role = req.headers["x-role"];
        if (!role) return res.status(401).json({ error: "Role header missing" });
        if (!allowedRoles.includes(role.toLowerCase())) {
            return res.status(403).json({ error: "Access forbidden: insufficient permissions" });
        }
        next();
    };
}

module.exports = roleCheckMiddleware;