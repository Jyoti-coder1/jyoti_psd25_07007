const Content = require('../models/Content');

exports.createContent = async (req, res) => {
    try {
        const { title, body, type } = req.body;
        if (!['free', 'premium'].includes(type)) return res.status(400).json({ message: 'Invalid content type' });
        const content = await Content.create({ title, body, type, createdBy: req.user.id });
        res.status(201).json(content);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteContent = async (req, res) => {
    try {
        const id = req.params.id;
        await Content.findByIdAndDelete(id);
        res.json({ message: 'Content deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getFree = async (req, res) => {
    const items = await Content.find({ type: 'free' });
    res.json(items);
};

exports.getPremium = async (req, res) => {
    const plan = req.user.subscription?.plan || 'free';
    if (!['premium', 'pro'].includes(plan)) return res.status(403).json({ message: 'Upgrade required' });

    const items = await Content.find({ type: 'premium' });
    res.json(items);
};