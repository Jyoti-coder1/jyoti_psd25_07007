const express = require("express");
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const { title, content } = req.body;
    const note = new Note({ title, content, createdBy: req.userId });
    await note.save();
    res.status(201).send("Note Created");
});

router.get("/", auth, async (req, res) => {
    const notes = await Note.find({ createdBy: req.userId });
    res.status(200).json(notes);
});

router.put("/:id", auth, async (req, res) => {
    await Note.updateOne({ _id: req.params.id, createdBy: req.userId }, req.body);
    res.send("Note Updated");
});

router.delete("/:id", auth, async (req, res) => {
    await Note.deleteOne({ _id: req.params.id, createdBy: req.userId });
    res.send("Note Deleted");
});

module.exports = router;