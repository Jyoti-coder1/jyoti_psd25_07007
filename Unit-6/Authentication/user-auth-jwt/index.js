require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const authMiddleware = require('./middleware/auth.middleware');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'You reached a protected route', user: req.user });
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    })
    .catch(err => {
        console.error('DB connection error', err);
    });