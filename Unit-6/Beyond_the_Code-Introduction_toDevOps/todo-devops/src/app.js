const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const todoRoutes = require('./routes/todo.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
app.use(express.json());

app.use('/api/todos', todoRoutes);
app.get('/', (req, res) => res.json({ success: true, message: 'API running' }));

app.use(errorMiddleware);

mongoose.connect(config.mongoURI)
    .then(() => {
        app.listen(config.port, () =>
            console.log(`Server running on port ${config.port}`)
        );
    })
    .catch(console.error);

module.exports = app;