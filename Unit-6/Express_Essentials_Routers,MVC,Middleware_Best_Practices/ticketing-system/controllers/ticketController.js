const ticketModel = require("../models/ticketModel");

async function getAll(req, res, next) {
    try {
        const tickets = await ticketModel.getAllTickets();
        res.json(tickets);
    } catch (err) {
        next(err);
    }
}

async function getById(req, res, next) {
    try {
        const id = Number(req.params.id);
        const ticket = await ticketModel.getTicketById(id);
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });
        res.json(ticket);
    } catch (err) {
        next(err);
    }
}

async function create(req, res, next) {
    try {
        const { title, description, priority, user } = req.body;
        const ticket = await ticketModel.createTicket({ title, description, priority, user });
        res.status(201).json(ticket);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { title, description, priority } = req.body;
        const updated = await ticketModel.updateTicket(id, { title, description, priority });
        if (!updated) return res.status(404).json({ error: "Ticket not found" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const id = Number(req.params.id);
        const ok = await ticketModel.deleteTicket(id);
        if (!ok) return res.status(404).json({ error: "Ticket not found" });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
}

async function resolve(req, res, next) {
    try {
        const id = Number(req.params.id);
        const ticket = await ticketModel.getTicketById(id);
        if (!ticket) return res.status(404).json({ error: "Ticket not found" });
        if (ticket.status === "resolved") {
            return res.status(400).json({ error: "Ticket already resolved" });
        }
        const updated = await ticketModel.updateTicket(id, { status: "resolved" });
        res.json(updated);
    } catch (err) {
        next(err);
    }
}

module.exports = { getAll, getById, create, update, remove, resolve };