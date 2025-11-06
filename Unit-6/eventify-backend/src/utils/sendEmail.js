import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

export const sendEmail = async ({ to, subject, html}) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html
    };
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response || info);
        return info;
    }
    catch (err) {
        console.error("Error sending email", err);
        throw err;
    }
};

export const sendToUserAndSuperAdmin = async ({ userEmail, subject, html }) => {
    const recipients = `${usetEmail},${process.env.SUPERADMIN_EMAIL}`;
    return sendEmail({ to: recipients, subject, html });
};