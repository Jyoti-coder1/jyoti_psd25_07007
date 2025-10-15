const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

function generateReportStream(statusObj) {
    const doc = new PDFDocument({ margin: 30 });
    const stream = new PassThrough();
    doc.pipe(stream);

    doc.fontSize(18).text('Bulk Insert Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`User ID: ${statusObj.userId}`);
    doc.text(`Processed At: ${new Date(statusObj.processedAt).toLocaleString()}`);
    doc.text(`Inserted Count: ${statusObj.insertedCount}`);
    doc.text(`Failed Count: ${statusObj.failedCount}`);
    doc.moveDown();

    if (Array.isArray(statusObj.failures) && statusObj.failures.length) {
        doc.fontSize(14).text('Failures:', { underline: true });
        statusObj.failures.forEach((f, idx) => {
            doc.fontSize(10).text(`${idx + 1}. Item: ${JSON.stringify(f.item)}\n   Reason: ${f.reason}\n`);
        });
    }
    else {
        doc.fontSize(12).text('No failures.');
    }

    doc.end();
    const filename = `bulk-report-${statusObj.userId}-${Date.now()}.pdf`;
    return { stream, filename };
}

module.exports = { generateReportStream };