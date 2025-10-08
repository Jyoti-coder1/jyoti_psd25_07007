const Learner = require("../models/learner.model");
const Session = require("../models/session.model");

const addLearner = async (req, res) => {
    try {
        const learner = new Learner(req.body);
        await learner.save();
        res.status(201).json(learner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteLearner = async (req, res) => {
    try {
        await Learner.findByIdAndUpdate(req.params.id, { isActive: false });
        await Session.updateMany(
            { learnerIds: req.params.id, scheduledAt: { $gte: new Date() } },
            { $pull: { learnerIds: req.params.id } }
        );

        res.json({ message: "Learner deactivated & removed from upcoming sessions" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addLearner, deleteLearner };