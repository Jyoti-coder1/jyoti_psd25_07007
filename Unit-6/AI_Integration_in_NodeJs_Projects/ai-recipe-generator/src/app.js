require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');

const recipeRouter = require('./routes/recipe.routes');

const app = express();
app.use(cors());
app.use(express.json());

const OUTPUT_DIR = process.env.OUTPUT_DIR || './output';
fs.ensureDirSync(OUTPUT_DIR);

app.use('/api', recipeRouter);

app.get('/', (req, res) => res.json({ success: true, message: 'AI Recipe Generator API' }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});