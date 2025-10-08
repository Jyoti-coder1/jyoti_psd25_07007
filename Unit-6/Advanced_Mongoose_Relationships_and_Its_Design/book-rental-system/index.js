const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
app.use(express.json());

connectDB();

app.use('/', userRoutes);
app.use('/', bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));