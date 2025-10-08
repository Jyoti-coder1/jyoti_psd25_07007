const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    expertise: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model("Mentor", mentorSchema);