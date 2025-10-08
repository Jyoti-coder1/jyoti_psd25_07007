const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
});

const CourseModel = mongoose.model("Course", courseSchema);
module.exports = { CourseModel };