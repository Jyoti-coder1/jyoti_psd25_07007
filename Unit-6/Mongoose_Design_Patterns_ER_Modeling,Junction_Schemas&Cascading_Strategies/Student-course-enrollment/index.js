const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connection } = require("./config/db");
const { studentRouter } = require("./routes/student.routes");
const { courseRouter } = require("./routes/course.routes");
const { enrollmentRouter } = require("./routes/enrollment.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Student-Course Enrollment API"));

app.use("/students", studentRouter);
app.use("/courses", courseRouter);
app.use("/enroll", enrollmentRouter);

app.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
        console.log(`Server running on port ${process.env.PORT}`);
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
});