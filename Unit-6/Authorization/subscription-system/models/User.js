const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
    startDate: Date,
    expiryDate: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    subscription: { type: subscriptionSchema, default: { plan: 'free' } }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);