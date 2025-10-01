const fs = require("fs").promises;
const path = require("path");
const DB_PATH = path.join(__dirname, "..", "db.json");

async function readDb() {
    try {
        const raw = await fs.readFile(DB_PATH, "utf8");
        return JSON.parse(raw || "[]");
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

async function writeDb(tickets) {
    await fs.writeFile(DB_PATH, JSON.stringify(tickets, null, 2), "utf8");
}

async function getAllTickets() {
    return await readDb();
}

async function getTicketById(id) {
    const tickets = await readDb();
    return tickets.find(t => t.id === id) || null;
}

async function createTicket(data) {
    const tickets = await readDb();
    const nextId = tickets.length ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
    const ticket = { id: nextId, ...data, status: "pending" };
    tickets.push(ticket);
    await writeDb(tickets);
    return ticket;
}

async function updateTicket(id, updates) {
    const tickets = await readDb();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return null;
    tickets[index] = { ...tickets[index], ...updates };
    await writeDb(tickets);
    return tickets[index];
}

async function deleteTicket(id) {
    const tickets = await readDb();
    const index = tickets.findIndex(t => t.id === id);
    if (index === -1) return false;
    tickets.splice(index, 1);
    await writeDb(tickets);
    return true;
}

module.exports = {
    getAllTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};