const Mentor = require("../models/mentor.model");
const Session = require("../models/session.model");

const addMentor = async (req, res) => {
    try {
        const mentor = new Mentor(req.body);
        await mentor.save();
        res.status(201).json(mentor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteMentor = async (req, res) => {
    try {
        const mentor = await Mentor.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

        await Session.updateMany(
            { mentorId: req.params.id, scheduledAt: { $gte: new Date() } },
            { isActive: false }
        );

        res.json({ message: "Mentor deactivated & upcoming sessions disabled" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addMentor, deleteMentor };