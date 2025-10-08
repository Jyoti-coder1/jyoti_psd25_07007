const User = require("../models/user.model");
const Profile = require("../models/profile.model");

const addUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!name || !email)
            return res.status(400).json({ message: "Name and Email required" });

        const user = new User({ name, email });
        await user.save();

        res.status(201).json({ message: "User created successfully", user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addProfile = async (req, res) => {
    try {
        const { bio, socialMediaLinks, user } = req.body;

        const userExists = await User.findById(user);
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingProfile = await Profile.findOne({ user });
        if (existingProfile) {
            return res.status(409).json({ message: "Profile already exists for this user" });
        }

        const profile = new Profile({ bio, socialMediaLinks, user });
        await profile.save();

        res.status(201).json({ message: "Profile created successfully", profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find().populate("user", "name email");
        res.status(200).json({ profiles });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addUser, addProfile, getProfiles };