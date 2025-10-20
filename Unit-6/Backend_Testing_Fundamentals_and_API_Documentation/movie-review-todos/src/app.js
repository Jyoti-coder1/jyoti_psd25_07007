const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.get("/", (req, res) => res.json({ ok: true }));

module.exports = app;