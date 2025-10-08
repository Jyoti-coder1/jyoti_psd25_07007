const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { bookRouter } = require("./routes/book.routes");
const { memberRouter } = require("./routes/member.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send("Library Management System API"));

app.use("/books", bookRouter);
app.use("/members", memberRouter);

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Connected to MongoDB");
        console.log("Server running on port 8080");
    } catch (err) {
        console.log("DB Connection Error:", err);
    }
});