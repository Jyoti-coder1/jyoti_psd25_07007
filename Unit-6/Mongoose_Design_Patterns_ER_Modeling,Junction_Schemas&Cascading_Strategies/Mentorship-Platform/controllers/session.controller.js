const Session = require("../models/session.model");
const Mentor = require("../models/mentor.model");
const Learner = require("../models/learner.model");

const addSession = async (req, res) => {
    try {
        const { mentorId, learnerIds, topic, scheduledAt, notes } = req.body;

        const mentor = await Mentor.findById(mentorId);
        const learners = await Learner.find({ _id: { $in: learnerIds } });

        if (!mentor || !mentor.isActive)
            return res.status(400).json({ message: "Invalid or inactive mentor" });

        if (learners.some(l => !l.isActive))
            return res.status(400).json({ message: "One or more learners are inactive" });

        const session = new Session({ mentorId, learnerIds, topic, scheduledAt, notes });
        await session.save();

        res.status(201).json(session);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getRecentSessions = async (req, res) => {
    const sessions = await Session.find({ isActive: true, isArchived: false })
        .populate("mentorId", "name expertise")
        .populate("learnerIds", "name email")
        .sort({ scheduledAt: -1 })
        .limit(5);
    res.json(sessions);
};

const getLearnersBySession = async (req, res) => {
    const session = await Session.findById(req.params.id).populate("learnerIds", "name email");
    res.json(session.learnerIds);
};

const archiveSession = async (req, res) => {
    const session = await Session.findByIdAndUpdate(req.params.id, { isArchived: true }, { new: true });
    res.json({ message: "Session archived", session });
};

module.exports = { addSession, getRecentSessions, getLearnersBySession, archiveSession };