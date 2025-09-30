const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = './db.json';

function readData() {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data).dishes;
}

function writeData(dishes) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ dishes }, null, 2));
}

app.post('/dishes', (req, res) => {
    const dishes = readData();
    const newDish = { id: dishes.length + 1, ...req.body };
    dishes.push(newDish);
    writeData(dishes);
    res.status(201).json(newDish);
});

app.get('/dishes', (req, res) => {
    const dishes = readData();
    res.status(200).json(dishes);
});

app.get('/dishes/:id', (req, res) => {
    const dishes = readData();
    const dish = dishes.find(d => d.id === parseInt(req.params.id));
    if (!dish) return res.status(404).json({ message: 'Dish not found' });
    res.status(200).json(dish);
});

app.put('/dishes/:id', (req, res) => {
    const dishes = readData();
    const index = dishes.findIndex(d => d.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Dish not found' });
    dishes[index] = { id: dishes[index].id, ...req.body };
    writeData(dishes);
    res.status(200).json(dishes[index]);
});

app.delete('/dishes/:id', (req, res) => {
    let dishes = readData();
    const index = dishes.findIndex(d => d.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Dish not found' });
    const deleted = dishes.splice(index, 1);
    writeData(dishes);
    res.status(200).json(deleted[0]);
});

app.get('/dishes/get', (req, res) => {
    const { name } = req.query;
    if (!name) return res.status(400).json({ message: 'Name query is required' });
    const dishes = readData();
    const results = dishes.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    if (results.length === 0) return res.status(404).json({ message: 'No dishes found' });
    res.status(200).json(results);
});

app.use((req, res) => {
    res.status(404).json({ error: '404 Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});