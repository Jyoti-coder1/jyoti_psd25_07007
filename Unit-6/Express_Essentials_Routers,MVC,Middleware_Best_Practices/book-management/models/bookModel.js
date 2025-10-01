const fs = require("fs").promises;
const path = require("path");
const DB_PATH = path.join(__dirname, "..", "db.json");

async function readDb() {
    try {
        const data = await fs.readFile(DB_PATH, "utf8");
        return JSON.parse(data || "[]");
    } catch (err) {
        if (err.code === "ENOENT") return [];
        throw err;
    }
}

async function writeDb(books) {
    await fs.writeFile(DB_PATH, JSON.stringify(books, null, 2), "utf8");
}

async function getAllBooks() {
    return await readDb();
}

async function getBookById(id) {
    const books = await readDb();
    return books.find(b => b.id === id) || null;
}

async function createBook(data) {
    const books = await readDb();
    const nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const book = { id: nextId, status: "available", borrowedBy: null, borrowedDate: null, ...data };
    books.push(book);
    await writeDb(books);
    return book;
}

async function updateBook(id, updates) {
    const books = await readDb();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return null;
    books[index] = { ...books[index], ...updates };
    await writeDb(books);
    return books[index];
}

async function deleteBook(id) {
    const books = await readDb();
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return false;
    books.splice(index, 1);
    await writeDb(books);
    return true;
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};