require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/blogs", blogRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(process.env.PORT, () => console.log("Server running"));
});