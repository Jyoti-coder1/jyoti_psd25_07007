const express = require("express");
const { StudentModel } = require("../models/student.model");
const { EnrollmentModel } = require("../models/enrollment.model");

const studentRouter = express.Router();

studentRouter.post("/", async (req, res) => {
    try {
        const student = new StudentModel(req.body);
        await student.save();
        res.status(201).json({ message: "Student created", student });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

studentRouter.delete("/:id", async (req, res) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        student.isActive = false;
        await student.save();

        await EnrollmentModel.updateMany(
            { studentId: student._id },
            { $set: { isActive: false } }
        );

        res.json({ message: "Student and enrollments deactivated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

studentRouter.get("/:id/courses", async (req, res) => {
    try {
        const enrollments = await EnrollmentModel.find({
            studentId: req.params.id,
            isActive: true,
        }).populate("courseId");

        const activeCourses = enrollments.map(e => e.courseId);
        res.json(activeCourses);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = { studentRouter };