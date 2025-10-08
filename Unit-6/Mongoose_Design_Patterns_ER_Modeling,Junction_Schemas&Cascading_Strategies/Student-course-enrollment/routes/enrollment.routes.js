const express = require("express");
const { EnrollmentModel } = require("../models/enrollment.model");
const { StudentModel } = require("../models/student.model");
const { CourseModel } = require("../models/course.model");

const enrollmentRouter = express.Router();

enrollmentRouter.post("/", async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        const student = await StudentModel.findById(studentId);
        const course = await CourseModel.findById(courseId);

        if (!student || !course)
            return res.status(404).json({ message: "Invalid student or course" });

        if (!student.isActive || !course.isActive)
            return res.status(400).json({ message: "Inactive student or course" });

        const existing = await EnrollmentModel.findOne({ studentId, courseId });
        if (existing && existing.isActive)
            return res.status(400).json({ message: "Already enrolled" });

        const enrollment = new EnrollmentModel({ studentId, courseId });
        await enrollment.save();

        res.status(201).json({ message: "Enrollment successful", enrollment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = { enrollmentRouter };