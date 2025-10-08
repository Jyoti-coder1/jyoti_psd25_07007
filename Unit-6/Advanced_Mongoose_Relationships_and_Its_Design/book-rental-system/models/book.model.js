const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: [true, 'Title required'], minlength: [3, 'Title must be at least 3 characters'] },
    author: { type: String, required: [true, 'Author required'] },
    genre: { type: String },
    rentedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);