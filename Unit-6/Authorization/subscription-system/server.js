require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const subRoutes = require('./routes/subscription.routes');
const contentRoutes = require('./routes/content.routes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/subscription', subRoutes);
app.use('/content', contentRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Server running on ${port}`));
    })
    .catch(err => console.error('DB error', err));