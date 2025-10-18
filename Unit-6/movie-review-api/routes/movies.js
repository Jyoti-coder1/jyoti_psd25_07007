const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Movie = require("../models/Movie");
const Review = require("../models/Review");

router.post("/", auth, async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ message: "Admin only" });
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
   const filter = req.query.genre ? { genre: req.query.genre } : {};
   const movies = await Movie.find(filter);
   res.json(movies);
});

router.get("/:id", async (req, res) => {
   const movie = await Movie.findById(req.params.id);
   if (!movie) return res.status(404).json({ message: "Movie not found" });
   const reviews = await Review.find({ movie: movie._id }).populate("user", "name email");
   res.json({ movie, reviews });
});

router.delete("/:id", auth, async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json({ message: "Admin only" });
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Movie deleted" });
})

module.exports = router;