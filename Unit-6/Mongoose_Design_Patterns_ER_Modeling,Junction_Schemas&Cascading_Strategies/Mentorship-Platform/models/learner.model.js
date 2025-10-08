const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Learner", learnerSchema);