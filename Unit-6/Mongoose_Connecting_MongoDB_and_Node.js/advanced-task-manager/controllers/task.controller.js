const Task = require('../models/task.model');

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        const existing = await Task.findOne({ title });
        if (existing) return res.status(400).json({ message: "Title must be unique" });

        const task = new Task({ title, description, priority, dueDate });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const { priority, isCompleted } = req.query;
        let filter = {};
        if (priority) filter.priority = priority;
        if (isCompleted) filter.isCompleted = isCompleted === "true";

        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const { title, description, priority, isCompleted } = req.body;

        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (title) task.title = title;
        if (description) task.description = description;
        if (priority) task.priority = priority;

        if (isCompleted === true && task.isCompleted === false) {
            task.isCompleted = true;
            task.completionDate = new Date();
        }

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTasks = async (req, res) => {
    try {
        const { priority } = req.query;
        if (!priority) return res.status(400).json({ message: "Priority filter required" });

        const result = await Task.deleteMany({ priority });
        res.json({ message: `${result.deletedCount} task(s) deleted` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTasks };