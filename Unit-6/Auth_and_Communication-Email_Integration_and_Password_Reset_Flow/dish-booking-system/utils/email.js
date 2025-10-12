const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'your_ethereal_user',
        pass: 'your_ethereal_pass'
    }
});

const sendEmail = async (to, subject, html) => {
    const info = await transporter.sendMail({
        from: '"Dish Booking App" <no-reply@example.com>',
        to,
        subject,
        html,
    });
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};

module.exports = sendEmail;