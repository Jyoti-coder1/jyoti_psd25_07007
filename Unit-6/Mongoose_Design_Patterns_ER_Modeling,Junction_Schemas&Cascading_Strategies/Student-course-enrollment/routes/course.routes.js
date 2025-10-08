const express = require("express");
const { CourseModel } = require("../models/course.model");
const { EnrollmentModel } = require("../models/enrollment.model");

const courseRouter = express.Router();

courseRouter.post("/", async (req, res) => {
    try {
        const course = new CourseModel(req.body);
        await course.save();
        res.status(201).json({ message: "Course created", course });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

courseRouter.delete("/:id", async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) return res.status(404).json({ message: "Course not found" });

        course.isActive = false;
        await course.save();

        await EnrollmentModel.updateMany(
            { courseId: course._id },
            { $set: { isActive: false } }
        );

        res.json({ message: "Course and enrollments deactivated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

courseRouter.get("/:id/students", async (req, res) => {
    try {
        const enrollments = await EnrollmentModel.find({
            courseId: req.params.id,
            isActive: true,
        }).populate("studentId");

        const activeStudents = enrollments.map(e => e.studentId);
        res.json(activeStudents);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = { courseRouter };