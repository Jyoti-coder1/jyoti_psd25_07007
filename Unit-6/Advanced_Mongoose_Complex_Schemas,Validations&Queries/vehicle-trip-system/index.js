const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const vehicleRoutes = require('./routes/vehicle.routes');
const errorHandler = require('./middleware/error.middleware');

const app = express();
app.use(bodyParser.json());

connectDB();

app.use('/', vehicleRoutes);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));