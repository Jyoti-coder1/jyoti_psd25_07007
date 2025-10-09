const express = require("express");
const router = express.Router();
const {
    movieBookings,
    userBookings,
    topUsers,
    genreWiseBookings,
    activeBookings,
} = require("../controllers/analyticsController");

router.get("/analytics/movie-bookings", movieBookings);
router.get("/analytics/user-bookings", userBookings);
router.get("/analytics/top-users", topUsers);
router.get("/analytics/genre-wise-bookings", genreWiseBookings);
router.get("/analytics/active-bookings", activeBookings);

module.exports = router;