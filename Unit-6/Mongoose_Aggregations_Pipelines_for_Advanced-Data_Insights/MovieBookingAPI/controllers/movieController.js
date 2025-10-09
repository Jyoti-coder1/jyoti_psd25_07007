const Movie = require("../models/movie");

exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(200).json({ message: "Movie created", movie });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};