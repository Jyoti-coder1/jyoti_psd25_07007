const Booking = require("../models/booking");
const User = require("../models/user");
const Movie = require("../models/movie");

exports.createBooking = async (req, res) => {
    try {
        const { userId, movieId, seats } = req.body;

        const userExists = await User.findById(userId);
        const movieExists = await Movie.findById(movieId);
        if (!userExists || !movieExists) {
            return res.status(400).json({ error: "User or Movie does not exist" });
        }

        const booking = new Booking(req.body);
        await booking.save();
        res.status(200).json({ message: "Booking created", booking });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};