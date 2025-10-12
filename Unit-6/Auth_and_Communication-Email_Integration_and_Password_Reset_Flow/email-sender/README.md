# NodeMailer Email Sender

## Project Overview
This is a simple Node.js Express application that allows sending emails using Nodemailer.  
The application has a single route /sendemail which sends a test email to a recipient.

---

## Features
- Send emails via Gmail SMTP
- Uses environment variables for sensitive credentials
- Easy setup and configuration

---

## Installation

1. *Open the terminal*
terminal
mkdir email-sender
cd email-sender

2. Install dependencies

npm install express nodemailer dotenv

3. Create a .env file Create a .env file in the root directory of the project and fill in the values as below:

PORT=3000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
TO_EMAIL=recipient_email@example.com



4. Start the server

npm start

The server will run on http://localhost:3000.


---

## Usage

Open your browser or Postman

Make a GET request to:


http://localhost:3000/sendemail

The email will be sent to the recipient specified in TO_EMAIL.



---

## Notes

For Gmail, you need to use an App Password instead of your regular account password.

Create an App Password in your Google Account → Security → App Passwords.

Use the generated App Password in EMAIL_PASS.


Make sure Less Secure App Access is enabled if you’re using a normal Gmail account.

Always keep your credentials secret and do not push .env to public repositories.


---

## Folder Structure

email-sender/
│
├── node_modules/
├── server.js
├── package.json
├── package-lock.json
├── .env
└── README.md