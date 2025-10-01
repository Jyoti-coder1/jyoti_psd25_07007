const express = require("express");
const app = express();
const ticketRoutes = require("./routes/ticketRoutes");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/tickets", ticketRoutes);

app.get("/", (req, res) => res.send("Ticketing System API is running"));

app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));