const express = require("express");
const app = express();
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const adminRoutes = require("./routes/adminRoutes");
const readerRoutes = require("./routes/readerRoutes");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/admin", adminRoutes);
app.use("/reader", readerRoutes);

app.get("/", (req, res) => res.send("Book Management System API is running"));

app.use((req, res) => res.status(404).send("404 Not Found"));

app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));