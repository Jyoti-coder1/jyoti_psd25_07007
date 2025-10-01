const fs = require('fs').promises;
const path = require('path');
const DB_PATH = path.join(__dirname, '..', 'db.json');

async function readDb() {
    try {
        const raw = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
}

async function writeDb(todos) {
    const data = JSON.stringify(todos, null, 2);
    await fs.writeFile(DB_PATH, data, 'utf8');
}

async function getAllTodos() {
    return await readDb();
}

async function getTodoById(id) {
    const todos = await readDb();
    return todos.find(t => t.id === id) || null;
}

async function createTodo({ title, completed = false }) {
    const todos = await readDb();
    const nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const todo = { id: nextId, title: String(title), completed: !!completed };
    todos.push(todo);
    await writeDb(todos);
    return todo;
}

async function updateTodoById(id, updates) {
    const todos = await readDb();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return null;
    const updated = { ...todos[index], ...updates, id }; // ensure id unchanged
    todos[index] = updated;
    await writeDb(todos);
    return updated;
}

async function deleteTodoById(id) {
    const todos = await readDb();
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    todos.splice(index, 1);
    await writeDb(todos);
    return true;
}

async function searchTodosByTitle(q) {
    if (!q) return [];
    const todos = await readDb();
    const qLower = q.toLowerCase();
    return todos.filter(t => String(t.title).toLowerCase().includes(qLower));
}

module.exports = {
    getAllTodos,
    getTodoById,
    createTodo,
    updateTodoById,
    deleteTodoById,
    searchTodosByTitle
};