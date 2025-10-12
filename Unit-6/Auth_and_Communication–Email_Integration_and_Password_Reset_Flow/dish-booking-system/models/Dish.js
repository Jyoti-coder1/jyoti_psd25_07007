const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
    name: String,
    price: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Dish', dishSchema);