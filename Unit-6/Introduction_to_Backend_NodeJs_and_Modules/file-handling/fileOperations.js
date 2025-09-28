const fs = require('fs').promises;
const filePath = 'data.txt';

async function readFileData() {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        console.log(data || '[Empty File]');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('File not found. Creating a new file...');
            await fs.writeFile(filePath, '');
            console.log('File created successfully.');
        }
        else {
            console.error('Error reading file:', err);
        }
    }
}

async function appendFileData() {
    const contentToAppend = 'This is Appended data\n';
    try {
        await fs.appendFile(filePath, contentToAppend);
        console.log('Appending data...');
    } catch (err) {
        console.error('Error appending to file:', err);
    }
}

module.exports = { readFileData, appendFileData };