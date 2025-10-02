const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const PORT = 3000;

app.use('/api', apiRoutes);
app.use((req, res) => {
    res.status(404).json({ error: "404 Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});