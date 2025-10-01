const express = require("express");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middlewares/loggerMiddleware");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/employees", employeeRoutes);

app.get("/", (req, res) => res.send("Employee Management API running"));

app.use((req, res) => res.status(404).send("404 Not Found"));

app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));