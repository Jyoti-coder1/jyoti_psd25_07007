const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/', userRoutes);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));