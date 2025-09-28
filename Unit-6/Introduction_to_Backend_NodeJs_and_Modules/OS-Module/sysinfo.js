const os = require('os');

function getSystemInfo() {
    const cpus = os.cpus();

    console.log('System Information:');
    console.log('-------------------------');
    console.log('Architecture:', os.arch());
    console.log('CPU Cores:', cpus.length);
    console.log('CPU Model:', cpus[0].model);
    console.log('CPU Speed:', cpus[0].speed / 1000, 'GHz');
    console.log('Total Memory:', (os.totalmem() / (1024 ** 3)).toFixed(2), 'GB');
    console.log('Free Memory:', (os.freemem() / (1024 ** 3)).toFixed(2), 'GB');
    console.log('Heap Memory Used:', (process.memoryUsage().heapUsed / (1024 ** 2)).toFixed(2), 'MB');
    console.log('Heap Memory Total:', (process.memoryUsage().heapTotal / (1024 ** 2)).toFixed(2), 'MB');
    console.log('Hostname:', os.hostname());
    console.log('OS Type:', os.type());
}

module.exports = { getSystemInfo };