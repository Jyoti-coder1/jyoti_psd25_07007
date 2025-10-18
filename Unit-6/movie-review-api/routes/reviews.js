const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Review = require("../models/Review");

router.post("/movieId", auth, async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const movieId = req.params.movieId;
        const existing = await Review.findOne({ user: req.user._id, movie: movieId });
        if (existing) return res.status(400).json({ message: "You already reviewed this movie" });
        await review.save();
        res.status(201).json(review);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put("/:id", auth, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (!review.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });
    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
});

router.delete("/:id", auth, async (req, res) => {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (!review.user.equals(req.user._id)) return res.status(403).json({ message: "Not authorized" });

    await review.deleteOne();
    res.json({ message: "review deleted" });
});

module.exports = router;