const employeeModel = require("../models/employeeModel");

async function getAll(req, res, next) {
    try {
        const employees = await employeeModel.getAllEmployees();
        res.json(employees);
    } catch (err) { next(err); }
}

async function create(req, res, next) {
    try {
        const { name, position, department, salary, status } = req.body;
        if (!name || !position || !department || !salary || !status) {
            return res.status(400).json({ error: "All employee fields are required" });
        }
        const employee = await employeeModel.createEmployee({ name, position, department, salary, status });
        res.status(201).json(employee);
    } catch (err) { next(err); }
}

async function update(req, res, next) {
    try {
        const id = Number(req.params.id);
        const updates = req.body;
        const updated = await employeeModel.updateEmployee(id, updates);
        if (!updated) return res.status(404).json({ error: "Employee not found" });
        res.json(updated);
    } catch (err) { next(err); }
}

async function remove(req, res, next) {
    try {
        const id = Number(req.params.id);
        const ok = await employeeModel.deleteEmployee(id);
        if (!ok) return res.status(404).json({ error: "Employee not found" });
        res.status(204).send();
    } catch (err) { next(err); }
}

module.exports = { getAll, create, update, remove };