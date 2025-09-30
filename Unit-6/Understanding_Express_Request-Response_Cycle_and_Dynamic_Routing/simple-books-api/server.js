const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = './db.json';

function readData() {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data).books;
}

function writeData(books) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ books }, null, 2));
}

app.post('/books', (req, res) => {
    const books = readData();
    const newBook = { id: books.length + 1, ...req.body };
    books.push(newBook);
    writeData(books);
    res.status(201).json(newBook);
});

app.get('/books', (req, res) => {
    const books = readData();
    res.status(200).json(books);
});

app.get('/books/:id', (req, res) => {
    const books = readData();
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
});

app.put('/books/:id', (req, res) => {
    const books = readData();
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    books[index] = { id: books[index].id, ...req.body };
    writeData(books);
    res.status(200).json(books[index]);
});

app.delete('/books/:id', (req, res) => {
    const books = readData();
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Book not found' });
    const deleted = books.splice(index, 1);
    writeData(books);
    res.status(200).json(deleted[0]);
});

app.get('/books/search', (req, res) => {
    const { author, title } = req.query;
    const books = readData();
    let results = books;

    if (author) {
        results = results.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
    }
    if (title) {
        results = results.filter(b => b.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (results.length === 0) return res.status(404).json({ message: 'No books found' });
    res.status(200).json(results);
});

app.use((req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});