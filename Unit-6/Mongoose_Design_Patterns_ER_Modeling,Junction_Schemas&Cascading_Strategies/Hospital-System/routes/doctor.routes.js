const express = require("express");
const Doctor = require("../models/doctor.model");
const Consultation = require("../models/consultation.model");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.status(201).json(doctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/:id/patients", async (req, res) => {
    try {
        const consultations = await Consultation.find({
            doctorId: req.params.id,
            isActive: true,
        })
            .populate("patientId", "name age gender")
            .sort({ consultedAt: -1 })
            .limit(5);

        res.json(consultations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id/consultations/count", async (req, res) => {
    try {
        const count = await Consultation.countDocuments({ doctorId: req.params.id, isActive: true });
        res.json({ doctorId: req.params.id, totalConsultations: count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });
        await Consultation.updateMany({ doctorId: req.params.id }, { isActive: false });
        res.json({ message: "Doctor and related consultations marked inactive." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;