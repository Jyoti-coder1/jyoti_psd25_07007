require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const { connectRedis } = require('./services/redisClient');
const { redisClient } = require('./services/redisClient');

const authRoutes = require('./routes/auth.routes');
const booksRoutes = require('./routes/books.routes');
const { startBulkBooksJob } = require('./jobs/bulkBooksJob');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/books', booksRoutes);

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');

        await connectRedis();
        console.log('Redis connected');

        startBulkBooksJob();

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (err) {
        console.error('Startup error', err);
        process.exit(1);
    }
}

start();