const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const SECRET = process.env.JWT_SECRET || 'devsecret';

module.exports = async (req, res, next) => {
    try {
        const auth = req.headers.authorization || '';
        const token = auth.startsWith('Bearer ') ? auth.split(' ')[1] : null;
        if (!token) return res.status(401).json({ message: 'Unauthorized' });
        const payload = jwt.verify(token, SECRET);
        const user = await User.findById(payload.id);
        if (!user) return res.status(401).json({ message: 'Unauthorized' });
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth error', err);
        res.status(401).json({ message: 'Invalid token' });
    }
};