const express = require('express');
const getFileInfo = require('./fileInfo');
const parseUrl = require('./urlparser');
const app = express();
const PORT = 3000;

app.get('/test', (req, res) => {
  res.send('Test route is working!');
});

app.get('/fileinfo', (req, res) => {
  const { filepath } = req.query;

  if (!filepath) {
    return res.status(400).json({
      error: '⚠ Missing query parameter "filepath". Please provide a file path.',
      usage: 'Example: http://localhost:3000/fileinfo?filepath=Data.txt'
    });
  }

  try {
    const info = getFileInfo(filepath);
    res.json(info);
  } catch (err) {
    res.status(400).json({
      error: `Invalid filepath: ${err.message}`,
      usage: 'Example: http://localhost:3000/fileinfo?filepath=Data.txt'
    });
  }
});

app.get('/parseurl', (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      error: '⚠ Missing query parameter "url". Please provide a valid URL.',
      usage: 'Example: http://localhost:3000/parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks'
    });
  }

  try {
    const result = parseUrl(url);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      error: `Unable to parse URL: ${err.message}`,
      usage: 'Example: http://localhost:3000/parseurl?url=https://masaischool.com/course?name=backend&duration=6weeks'
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found. Try /test, /fileinfo, or /parseurl'
  });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});