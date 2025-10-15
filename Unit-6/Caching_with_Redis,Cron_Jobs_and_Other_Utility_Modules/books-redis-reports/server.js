require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { connectRedis } = require('./services/redisClient');
const { startBulkBooksJob } = require('./jobs/bulkBooksJob');
const { startReportJob } = require('./jobs/reportJob');

const booksRoutes = require('./routes/books.routes');
const User = require('./models/User');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'email exists' });
        const user = new User({ name, email, password });
        await user.save();
        res.json({ message: 'user created', userId: user._id });
    } catch (err) {
        console.error(err); res.status(500).json({ message: 'err' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const u = await User.findOne({ email });
        if (!u) return res.status(401).json({ message: 'invalid' });
        const ok = await u.comparePassword(password);
        if (!ok) return res.status(401).json({ message: 'invalid' });
        const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '6h' });
        res.json({ token });
    } catch (err) { console.error(err); res.status(500).json({ message: 'err' }); }
});

app.use('/books', booksRoutes);

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo connected');

        await connectRedis();
        console.log('Redis connected');

        startBulkBooksJob();
        startReportJob();

        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server listening on ${port}`));
    } catch (err) {
        console.error('Startup error', err); process.exit(1);
    }
}

start();