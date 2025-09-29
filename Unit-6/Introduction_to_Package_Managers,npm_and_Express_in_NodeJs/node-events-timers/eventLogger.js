const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class Logger extends EventEmitter { }

const logger = new Logger();

logger.on('log', (message) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);

    const logPath = path.join(__dirname, 'events.log');
    fs.appendFile(logPath, `[${ timestamp }] ${ message }\n`, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
});

module.exports = logger;