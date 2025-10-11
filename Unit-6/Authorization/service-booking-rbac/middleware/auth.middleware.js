const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        if (!token) return res.status(401).json({ message: 'Access token required' });

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = { id: payload.id, role: payload.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired access token' });
    }
};

module.exports = auth;