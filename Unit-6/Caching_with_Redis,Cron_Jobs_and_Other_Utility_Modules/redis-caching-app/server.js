const express = require("express");
const bodyParser = require("body-parser");
const itemsRoute = require("./routes/items");

const app = express();
app.use(bodyParser.json());

app.use("/items", itemsRoute);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});