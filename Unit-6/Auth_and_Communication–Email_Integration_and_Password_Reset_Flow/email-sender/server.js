const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.get("/sendemail", async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: `${process.env.EMAIL_USER}, ${process.env.TO_EMAIL}`,
            subject: "Test Email from NEM Student",
            text: "This is a testing Mail sent by NEM student, no need to reply.",
    };

    await transporter.sendMail(mailOptions);
    res.send("Email sent successfully!");
} catch (error) {
    console.log(error);
    res.send("Failed to send email");
}
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});