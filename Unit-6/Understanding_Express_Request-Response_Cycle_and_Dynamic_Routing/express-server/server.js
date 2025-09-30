const express = require('express');
const app = express();
const PORT = 3000;

app.get('/home', (req, res) => {
    res.send('<h1>Welcome to Home Page</h1>');
});

app.get('/aboutus', (req, res) => {
    res.json({ message: 'Welcome to About Us' });
});

app.get('/contactus', (req, res) => {
    res.json({
        name: 'Jyoti Maan',
        email: 'jyotimaan@example.com',
        phone: '+1234567890'
    });
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});