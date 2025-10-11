const permit = (...allowedRoles) => (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
};

module.exports = { permit };