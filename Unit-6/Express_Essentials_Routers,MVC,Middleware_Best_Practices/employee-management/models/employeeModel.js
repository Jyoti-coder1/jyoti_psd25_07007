const fs = require("fs").promises;
const path = require("path");
const DB_PATH = path.join(__dirname, "..", "employees.json");

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, "utf8");
        return JSON.parse(data || "[]");
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

async function writeDb(employees) {
    await fs.writeFile(DB_PATH, JSON.stringify(employees, null, 2), "utf8");
}

async function getAllEmployees() {
    return await readDb();
}

async function getEmployeeById(id) {
    const employees = await readDb();
    return employees.find(e => e.id === id) || null;
}

async function createEmployee(data) {
    const employees = await readDb();
    const nextId = employees.length ? Math.max(...employees.map(e => e.id)) + 1 : 1;
    const employee = { id: nextId, ...data };
    employees.push(employee);
    await writeDb(employees);
    return employee;
}

async function updateEmployee(id, updates) {
    const employees = await readDb();
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) return null;
    employees[index] = { ...employees[index], ...updates };
    await writeDb(employees);
    return employees[index];
}

async function deleteEmployee(id) {
    const employees = await readDb();
    const index = employees.findIndex(e => e.id === id);
    if (index === -1) return false;
    employees.splice(index, 1);
    await writeDb(employees);
    return true;
}

module.exports = {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};