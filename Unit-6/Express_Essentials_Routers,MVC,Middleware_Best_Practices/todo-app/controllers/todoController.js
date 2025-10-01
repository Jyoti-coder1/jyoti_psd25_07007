const todoModel = require('../models/todoModel');

async function getAll(req, res, next) {
    try {
        const todos = await todoModel.getAllTodos();
        res.json(todos);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const todo = await todoModel.getTodoById(id);
        if (!todo) return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const { title, completed } = req.body;
        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'Title is required and must be a string' });
        }
        const todo = await todoModel.createTodo({ title, completed });
        res.status(201).json(todo);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const updates = {};
        if (req.body.title !== undefined) updates.title = String(req.body.title);
        if (req.body.completed !== undefined) updates.completed = !!req.body.completed;

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        const updated = await todoModel.updateTodoById(id, updates);
        if (!updated) return res.status(404).json({ error: 'Todo not found' });
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const ok = await todoModel.deleteTodoById(id);
        if (!ok) return res.status(404).json({ error: 'Todo not found' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

async function search(req, res, next) {
    try {
        const q = req.query.q || '';
        const results = await todoModel.searchTodosByTitle(q);
        res.json(results);
    } catch (err) {
        next(err);
    }
}

module.exports = { getAll, getById, create, update, remove, search };