const express = require("express");
const Patient = require("../models/patient.model");
const Consultation = require("../models/consultation.model");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const patient = new Patient(req.body);
        await patient.save();
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/:id/doctors", async (req, res) => {
    try {
        const consultations = await Consultation.find({
            patientId: req.params.id,
            isActive: true,
        }).populate("doctorId", "name specialization");
        res.json(consultations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    const { gender } = req.query;
    const filter = gender ? { gender, isActive: true } : {};
    const patients = await Patient.find(filter);
    res.json(patients);
});

router.delete("/:id", async (req, res) => {
    try {
        await Patient.findByIdAndUpdate(req.params.id, { isActive: false });
        await Consultation.updateMany({ patientId: req.params.id }, { isActive: false });
        res.json({ message: "Patient and related consultations marked inactive." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;