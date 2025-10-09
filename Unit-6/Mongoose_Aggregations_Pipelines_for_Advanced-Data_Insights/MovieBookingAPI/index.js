const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use(movieRoutes);
app.use(userRoutes);
app.use(bookingRoutes);
app.use(analyticsRoutes);

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));