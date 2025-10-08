const express = require("express");
const Consultation = require("../models/consultation.model");
const Doctor = require("../models/doctor.model");
const Patient = require("../models/patient.model");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { doctorId, patientId, notes } = req.body;

        const doctor = await Doctor.findById(doctorId);
        const patient = await Patient.findById(patientId);

        if (!doctor || !patient) return res.status(404).json({ message: "Doctor or Patient not found." });
        if (!doctor.isActive || !patient.isActive)
            return res.status(400).json({ message: "Doctor or Patient is inactive." });

        const consultation = new Consultation({ doctorId, patientId, notes });
        await consultation.save();

        res.status(201).json(consultation);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/recent", async (req, res) => {
    try {
        const consultations = await Consultation.find({ isActive: true })
            .populate("doctorId", "name specialization")
            .populate("patientId", "name age gender")
            .sort({ consultedAt: -1 })
            .limit(5);
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;