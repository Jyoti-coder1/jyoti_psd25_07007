# User Authentication & Password Reset API

## Setup

1. Open terminal:

mkdir auth-password-reset
cd auth-password-reset

2. Install dependencies:

npm install

3. Create .env file:

PORT=3000 MONGO_URI=mongodb://127.0.0.1:27017/authResetDB JWT_SECRET=your_random_jwt_secret_here JWT_EXPIRES=1h RESET_PASSWORD_EXPIRES=15m

4. Start server:

node server.js

5. Test endpoints using Postman:
- POST /signup
- POST /login
- POST /forgot-password
- POST /reset-password/:token

> Emails are sent using Ethereal test SMTP, no real credentials needed.