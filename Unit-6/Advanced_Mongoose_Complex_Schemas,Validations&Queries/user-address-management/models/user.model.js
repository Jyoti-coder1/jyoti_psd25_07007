const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, default: "India" },
    pincode: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    age: { type: Number },
    addresses: [addressSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;