const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
    topic: { type: String, required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    learnerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Learner" }],
    scheduledAt: { type: Date, required: true },
    notes: String,
    isActive: { type: Boolean, default: true },
    isArchived: { type: Boolean, default: false },
});

module.exports = mongoose.model("Session", sessionSchema);