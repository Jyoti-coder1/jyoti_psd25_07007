const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const libraryRoutes = require('./routes/library.routes');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/', libraryRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));