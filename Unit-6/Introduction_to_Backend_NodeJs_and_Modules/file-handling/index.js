const { readFileData, appendFileData } = require('./fileOperations');

async function main() {
    console.log('Initial File Content:');
    await readFileData();

    await appendFileData();

    console.log('\nUpdated File Content:');
    await readFileData();
}

main();