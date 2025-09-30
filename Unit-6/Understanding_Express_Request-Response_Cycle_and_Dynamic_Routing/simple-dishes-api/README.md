# Simple Dishes API

## Project Overview
This is a basic *Express.js application* performing CRUD operations on a collection of dishes using db.json as a simple database.

### Features
- Add a new dish: POST /dishes
- Retrieve all dishes: GET /dishes
- Retrieve a dish by ID: GET /dishes/:id
- Update a dish by ID: PUT /dishes/:id
- Delete a dish by ID: DELETE /dishes/:id
- Search dishes by name (supports partial match): GET /dishes/get?name=<dish_name>
- Undefined routes return 404 Not Found

---

## Prerequisites
- Node.js installed ([Download here](https://nodejs.org/))  

---

## Setup Instructions (Windows / Terminal)

1. *Create project folder and navigate into it:*
    
    mkdir simple-dishes-api
    cd simple-dishes-api
    

2. *Initialize Node.js project:*
    
    npm init -y
    

3. *Install Express.js:*
    
    npm install express
    

4. *Create db.json*  
   In the project folder, create a file named db.json with the following content:
    json
    {
      "dishes": []
    }
    

5. *Create server.js*  
   Create a file named server.js and paste the server code provided.

6. *Start the server:*
    
    node server.js
    

7. *Test the API routes* using Postman or browser:

| Method | Route | Description |
|--------|-------|-------------|
| POST | /dishes | Add a new dish (body JSON: { "name":"Idly", "price":50, "category":"Breakfast" }) |
| GET | /dishes | Retrieve all dishes |
| GET | /dishes/:id | Retrieve dish by ID |
| PUT | /dishes/:id | Update dish by ID |
| DELETE | /dishes/:id | Delete dish by ID |
| GET | /dishes/get?name=idly | Search dishes by name (partial match supported) |
| Any other | /anything | Returns 404 Not Found |

---

## Notes
- All endpoints return proper HTTP status codes (200 OK, 201 Created, 404 Not Found, 400 Bad Request)  
- Search by name supports *partial matches*  
- Simple file-based JSON database (db.json) for learning purposes  