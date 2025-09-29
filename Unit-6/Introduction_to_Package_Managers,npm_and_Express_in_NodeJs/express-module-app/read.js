const fs = require('fs');
const path = require('path');

function readFileContent() {
    try {
        const dataPath = path.join(__dirname, 'Data.txt');
        const content = fs.readFileSync(dataPath, 'utf-8');
        return content;
    }
    catch (err) {
        return 'Error: Unable to read file!';
    }
}
module.exports = readFileContent;