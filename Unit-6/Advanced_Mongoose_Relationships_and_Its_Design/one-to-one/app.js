const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes/main.routes");

const app = express();
app.use(express.json());
app.use("/", routes);

connectDB();

app.listen(8080, () => {
    console.log("Server running on port 8080");
});