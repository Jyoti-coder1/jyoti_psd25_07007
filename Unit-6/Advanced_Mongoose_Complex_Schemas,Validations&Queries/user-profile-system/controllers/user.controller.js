const User = require('../models/user.model');

const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User created", user });
    } catch (err) {
        next(err);
    }
};

const addProfile = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const profile = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.profiles.push(profile);
        await user.save();
        res.json({ message: "Profile added", user });
    } catch (err) {
        next(err);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const { profile } = req.query;
        let filter = {};
        if (profile) filter = { "profiles.profileName": profile };

        const users = await User.find(filter);
        res.json(users);
    } catch (err) {
        next(err);
    }
};

const searchUser = async (req, res, next) => {
    try {
        const { name, profile } = req.query;
        const user = await User.findOne({ name });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (profile) {
            const matchedProfile = user.profiles.find(p => p.profileName === profile);
            if (matchedProfile) {
                return res.json({ user: { name: user.name, email: user.email }, profile: matchedProfile });
            } else {
                return res.json({ message: "User found, but profile not found", user });
            }
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { userId, profileName } = req.params;
        const { url } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const profile = user.profiles.find(p => p.profileName === profileName);
        if (!profile) return res.status(404).json({ message: "Profile not found" });

        profile.url = url;
        await user.save();
        res.json({ message: "Profile updated", user });
    } catch (err) {
        next(err);
    }
};

const deleteProfile = async (req, res, next) => {
    try {
        const { userId, profileName } = req.params;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const profileIndex = user.profiles.findIndex(p => p.profileName === profileName);
        if (profileIndex === -1) return res.status(404).json({ message: "Profile not found" });

        user.profiles.splice(profileIndex, 1);
        await user.save();
        res.json({ message: "Profile deleted", user });
    } catch (err) {
        next(err);
    }
};

module.exports = { addUser, addProfile, getUsers, searchUser, updateProfile, deleteProfile };