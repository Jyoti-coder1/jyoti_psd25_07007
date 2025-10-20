const express = require("express");
const Todo = require("../models/Todo");
const auth = require("../middleware/auth");

const router = express.Router();

router.use(auth);

router.post("/", async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title) return res.status(400).json({ message: "Title required" });

        const todo = new Todo({ title, description, status, user: req.userId });
        await todo.save();
        return res.status(201).json(todo);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

router.get("/", async (req, res) => {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.userId) return res.status(403).json({ message: "Forbidden" });

    todo.title = req.body.title ?? todo.title;
    todo.description = req.body.description ?? todo.description;
    todo.status = req.body.status ?? todo.status;
    await todo.save();
    res.json(todo);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    if (todo.user.toString() !== req.userId) return res.status(403).json({ message: "Forbidden" });

    await todo.deleteOne();
    res.json({ message: "Deleted" });
});

module.exports = router;