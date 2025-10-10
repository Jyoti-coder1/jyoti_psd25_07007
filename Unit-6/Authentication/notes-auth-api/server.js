const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));