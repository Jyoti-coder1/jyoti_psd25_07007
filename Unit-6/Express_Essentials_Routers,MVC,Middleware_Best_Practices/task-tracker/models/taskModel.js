const fs = require("fs").promises;
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "tasks.json");

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, "utf8");
        return JSON.parse(data || "[]");
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

async function writeDb(tasks) {
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2), "utf8");
}

async function getAllTasks() {
    return await readDb();
}

async function getTaskById(id) {
    const tasks = await readDb();
    return tasks.find(t => t.id === id) || null;
}

async function createTask(data) {
    const tasks = await readDb();
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const task = { id: nextId, ...data };
    tasks.push(task);
    await writeDb(tasks);
    return task;
}

async function updateTask(id, updates) {
    const tasks = await readDb();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updates };
    await writeDb(tasks);
    return tasks[index];
}

async function deleteTask(id) {
    const tasks = await readDb();
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    await writeDb(tasks);
    return true;
}

async function filterByTag(tag) {
    const tasks = await readDb();
    return tasks.filter(t => t.tag.toLowerCase() === tag.toLowerCase());
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    filterByTag
};