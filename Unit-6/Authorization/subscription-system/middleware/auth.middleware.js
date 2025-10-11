const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isBlacklisted } = require('./blacklist.middleware');

module.exports = async function auth(req, res, next) {
    try {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        if (!token) return res.status(401).json({ message: 'Access token required' });

        if (await isBlacklisted(token)) return res.status(401).json({ message: 'Token blacklisted' });

        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await User.findById(payload.id);
        if (!user) return res.status(401).json({ message: 'User not found' });
        if (user.subscription && user.subscription.expiryDate) {
            const now = new Date();
            if (user.subscription.expiryDate < now && user.subscription.plan !== 'free') {
                user.subscription = { plan: 'free' };
                await user.save();
            }
        }

        req.user = { id: user._id, role: user.role, subscription: user.subscription || { plan: 'free' } };
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};