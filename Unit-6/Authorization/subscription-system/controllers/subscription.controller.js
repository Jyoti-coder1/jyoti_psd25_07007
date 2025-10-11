const User = require('../models/User');

const SUB_DAYS = parseInt(process.env.SUBSCRIPTION_DAYS || '30');

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}

exports.subscribe = async (req, res) => {
    try {
        const userId = req.user.id;
        const { plan } = req.body;
        if (!['premium', 'pro'].includes(plan)) return res.status(400).json({ message: 'Invalid plan' });

        const now = new Date();
        const expiry = addDays(now, SUB_DAYS);

        const user = await User.findByIdAndUpdate(userId, {
            subscription: { plan, startDate: now, expiryDate: expiry }
        }, { new: true });

        res.json({ message: 'Subscribed', subscription: user.subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.status = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.json({ subscription: user.subscription || { plan: 'free' } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.renew = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user.subscription || !user.subscription.expiryDate) return res.status(400).json({ message: 'No active subscription to renew' });

        const now = new Date();
        const base = user.subscription.expiryDate > now ? user.subscription.expiryDate : now;
        const newExpiry = addDays(base, SUB_DAYS);
        user.subscription.expiryDate = newExpiry;
        await user.save();
        res.json({ message: 'Subscription renewed', subscription: user.subscription });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cancel = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        user.subscription = { plan: 'free' };
        await user.save();
        res.json({ message: 'Subscription cancelled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};