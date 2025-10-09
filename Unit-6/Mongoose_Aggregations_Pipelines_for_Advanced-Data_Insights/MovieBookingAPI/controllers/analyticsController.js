const Booking = require("../models/booking");

exports.movieBookings = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            { $group: { _id: "$movieId", totalBookings: { $sum: 1 }, totalSeats: { $sum: "$seats" } } },
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.userBookings = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            { $lookup: { from: "movies", localField: "movieId", foreignField: "_id", as: "movie" } },
            { $unwind: "$movie" },
            { $group: { _id: "$userId", bookings: { $push: "$movie.title" } } },
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.topUsers = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            { $group: { _id: "$userId", count: { $sum: 1 } } },
            { $match: { count: { $gt: 2 } } },
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.genreWiseBookings = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            { $lookup: { from: "movies", localField: "movieId", foreignField: "_id", as: "movie" } },
            { $unwind: "$movie" },
            { $group: { _id: "$movie.genre", totalSeats: { $sum: "$seats" } } },
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.activeBookings = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            { $match: { status: "Booked" } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $lookup: { from: "movies", localField: "movieId", foreignField: "_id", as: "movie" } },
            { $unwind: "$movie" },
            { $project: { _id: 0, user: "$user.name", movie: "$movie.title", seats: 1, bookingDate: 1 } },
        ]);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};