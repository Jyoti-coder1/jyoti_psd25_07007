const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: String },
    releaseYear: { type: Number },
    director: { type: String },
    averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Movie", movieSchema);