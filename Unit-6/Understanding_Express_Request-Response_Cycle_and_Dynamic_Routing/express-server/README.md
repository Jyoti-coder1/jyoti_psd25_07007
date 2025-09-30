# Basic Express Server

## Project Overview
This is a simple *Express.js server* demonstrating basic routing.  
It includes the following routes:

- GET /home → Responds with HTML: "Welcome to Home Page"  
- GET /aboutus → Responds with JSON: { "message": "Welcome to About Us" }  
- GET /contactus → Responds with dummy contact details in JSON  
- Any undefined route → Responds with a 404 Not Found message  

This project is useful for learning *Express routing, HTTP responses, and handling undefined routes*.

---

## Prerequisites
Make sure you have *Node.js* installed on your machine.  
You can download it from [Node.js Official Website](https://nodejs.org/).

---

## Setup Instructions

1. *Clone the repository* (or create your project folder):
    bash
    git clone https://github.com/Jyoti-coder1/jyoti_psd25_07007/tree/main/Unit-6/Understanding_Express_Request-Response_Cycle_and_Dynamic_Routing
    cd express-server
    

2. *Initialize Node.js project* (if not already done):
    bash
    npm init -y
    

3. *Install Express.js*:
    bash
    npm install express
    

4. *Create server.js* in the project folder
    

5. *Start the server*:
    bash
    node server.js
    

6. *Test the routes* using a browser or Postman:
    - http://localhost:3000/home → HTML response  
    - http://localhost:3000/aboutus → JSON response  
    - http://localhost:3000/contactus → JSON contact details  
    - Any undefined route → 404 Not Found  

---

## Notes

- This project demonstrates *basic Express routing* and *error handling*.  
- HTTP status codes are returned appropriately (200 OK for valid routes, 404 Not Found for undefined routes).  
- You can extend this server to include more routes, middleware, or connect it to a database in the future.  