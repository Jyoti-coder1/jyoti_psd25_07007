const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");

const mentorRoutes = require("./routes/mentor.routes");
const learnerRoutes = require("./routes/learner.routes");
const sessionRoutes = require("./routes/session.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/mentors", mentorRoutes);
app.use("/learners", learnerRoutes);
app.use("/sessions", sessionRoutes);

app.get("/", (req, res) => res.send("Mentorship Platform API"));

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("MongoDB connected");
        console.log(`Server running on port ${process.env.PORT}`);
    } catch (err) {
        console.error(err);
    }
});