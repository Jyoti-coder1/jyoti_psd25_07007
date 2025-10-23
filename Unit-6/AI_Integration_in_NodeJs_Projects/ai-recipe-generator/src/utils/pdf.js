const puppeteer = require('puppeteer');
const path = require('path');

async function htmlToPdf(htmlFilePath, outPdfPath) {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    try {
        const page = await browser.newPage();
        await page.goto('file://' + path.resolve(htmlFilePath), { waitUntil: 'networkidle0' });
        await page.pdf({
            path: outPdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' }
        });
    } finally {
        await browser.close();
    }
}

module.exports = { htmlToPdf };