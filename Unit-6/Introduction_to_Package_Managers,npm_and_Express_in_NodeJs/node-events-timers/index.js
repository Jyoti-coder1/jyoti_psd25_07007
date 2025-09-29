const express = require('express');
const logger = require('./eventLogger');
const delayMessage = require('./delay');
const app = express();
const PORT = 3000;

app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

app.get('/emit', (req, res) => {
    const { message } = req.query;

    if (!message) {
        return res.status(400).json({
            error: 'Missing query parameter "message".',
            usage: 'Example: /emit?message=Server%20started'
        });
    }

    const timestamp = new Date().toISOString();
    logger.emit('log', message);

    res.json({
        status: 'Event logged',
        timestamp
    });
});

app.get('/delay', async (req, res) => {
    const { message, time } = req.query;

    if (!message || !time) {
        return res.status(400).json({
            error: 'Missing query parameters "message" or "time".',
            usage: 'Example: /delay?message=Waited&time=2000'
        });
    }

    try {
        const result = await delayMessage(message, time);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found. Try /test, /emit, or /delay'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});