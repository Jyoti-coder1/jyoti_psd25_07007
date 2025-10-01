const express = require('express');
const app = express();
const todoRoutes = require('./routes/todoRoutes');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/todos', todoRoutes);
app.get('/', (req, res) => res.send('Todo API is running'));
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});
app.use((err, req, res, next) => {
    console.error(err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});