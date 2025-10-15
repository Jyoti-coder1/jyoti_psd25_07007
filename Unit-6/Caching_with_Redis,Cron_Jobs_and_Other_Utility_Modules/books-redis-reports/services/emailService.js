const nodemailer = require('nodemailer');
require('dotenv').config();

async function createTransporter() {
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587', 10),
            secure: false,
            auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        });
    }
    else {
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: { user: testAccount.user, pass: testAccount.pass }
        });
        console.log('Ethereal account -> user:', testAccount.user, 'pass:', testAccount.pass);
        return transporter;
    }
}

async function sendMail({ to, subject, text, html, attachments }) {
    const transporter = await createTransporter();
    const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL || 'no-reply@example.com',
        to, subject, text, html, attachments
    });

    console.log('Email sent, messageId:', info.messageId);
    if (nodemailer.getTestMessageUrl(info)) {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    return info;
}

module.exports = { sendMail };