const express = require("express");
const { MemberModel } = require("../models/member.model");

const memberRouter = express.Router();

memberRouter.post("/add-member", async (req, res) => {
    try {
        const member = new MemberModel(req.body);
        await member.save();
        res.status(201).json({ message: "Member added successfully", member });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

memberRouter.get("/member-borrowed-books/:memberId", async (req, res) => {
    try {
        const member = await MemberModel.findById(req.params.memberId).populate("borrowedBooks");
        if (!member) return res.status(404).json({ message: "Member not found" });
        res.json(member);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = { memberRouter };