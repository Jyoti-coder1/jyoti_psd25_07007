# Simple Express App with User Routes

## Project Overview
This project demonstrates a basic *Express.js application* with user-related routes.  
It includes the following routes:

- GET /users/get → Returns a single dummy user as JSON  
- GET /users/list → Returns a list of three dummy users as JSON  
- Any undefined route → Returns { "error": "404 Not Found" }  

---

## Prerequisites
- Node.js installed ([Download here](https://nodejs.org/))  

---

## Setup Instructions

1. Go to terminal
    mkdir simple-express-server
    cd simple-express-users

2. Initialize Node.js project (if not done):
    terminal
    npm init -y
    

3. Install Express:
    terminal
    npm install express
    

4. Create server.js
    

5. Start the server:
    terminal
    node server.js
    

6. Test routes in browser or Postman:
    - http://localhost:3000/users/get  
    - http://localhost:3000/users/list  
    - Any other route → 404 Not Found  

---

## Notes
- Demonstrates *basic routing in Express*  
- Returns appropriate HTTP status codes (200 OK and 404 Not Found)  
- Simple, single-file structure for learning purposes  