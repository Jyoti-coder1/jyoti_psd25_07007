const taskModel = require("../models/taskModel");

async function getAll(req, res, next) {
    try { const tasks = await taskModel.getAllTasks(); res.json(tasks); }
    catch (err) { next(err); }
}

async function getById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const task = await taskModel.getTaskById(id);
        if (!task) return res.status(404).json({ error: "Task not found" });
        res.json(task);
    } catch (err) { next(err); }
}

async function filterByTag(req, res, next) {
    try {
        const tag = req.query.tag;
        if (!tag) return res.status(400).json({ error: "Tag query required" });
        const tasks = await taskModel.filterByTag(tag);
        res.json(tasks);
    } catch (err) { next(err); }
}

async function create(req, res, next) {
    try {
        const { title, description, tag, priority, status } = req.body;
        if (!title || !description || !tag || !priority || !status) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const task = await taskModel.createTask({ title, description, tag, priority, status });
        res.status(201).json(task);
    } catch (err) { next(err); }
}

async function update(req, res, next) {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const updated = await taskModel.updateTask(id, updates);
        if (!updated) return res.status(404).json({ error: "Task not found" });
        res.json(updated);
    } catch (err) { next(err); }
}

async function remove(req, res, next) {
    try {
        const id = Number(req.params.id);
        const ok = await taskModel.deleteTask(id);
        if (!ok) return res.status(404).json({ error: "Task not found" });
        res.status(204).send();
    } catch (err) { next(err); }
}

module.exports = { getAll, getById, filterByTag, create, update, remove };