const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./middleware/logger");

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(logger);

app.use("/api/auth", require("./routes/auth"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/reviews", require("./routes/reviews"));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then (() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));