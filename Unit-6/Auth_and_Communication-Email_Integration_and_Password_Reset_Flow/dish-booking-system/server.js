require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
app.use('api/auth', authRoutes);
const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));