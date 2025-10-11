require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => {
        console.error('DB connect error', err);
    });