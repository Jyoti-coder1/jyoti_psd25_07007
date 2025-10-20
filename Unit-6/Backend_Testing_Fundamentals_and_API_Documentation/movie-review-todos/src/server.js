const mongoose = require("mongoose");
const app = require("./app");
const { MONGO_URI, PORT } = require("./config");

async function start() {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

start().catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
});