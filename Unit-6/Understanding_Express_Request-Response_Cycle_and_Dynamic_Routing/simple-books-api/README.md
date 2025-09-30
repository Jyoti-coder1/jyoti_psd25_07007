# Simple Book Storage API

## Project Overview
This is a basic *Express.js application* that manages a collection of books using db.json as a database.

### Features
- Add a new book: POST /books
- Retrieve all books: GET /books
- Retrieve a book by ID: GET /books/:id
- Update a book by ID: PUT /books/:id
- Delete a book by ID: DELETE /books/:id
- Search books by author or title (partial match): GET /books/search?author=<author_name>&title=<book_title>
- Undefined routes return 404 Not Found

---

## Prerequisites
- Node.js installed ([Download here](https://nodejs.org/))  

---

## Setup Instructions (Terminal / Windows CMD)

1. *Create project folder and navigate into it:*
    
    mkdir simple-books-api
    cd simple-books-api
    

2. *Initialize Node.js project:*
    
    npm init -y
    

3. *Install Express.js:*
    
    npm install express
    

4. *Create db.json* in the project folder:
    json
    {
      "books": []
    }
    

5. *Create server.js* with the code provided above.

6. *Start the server:*
    
    node server.js
    

7. *Test API routes* using Postman or browser.

---

## Notes
- Returns appropriate HTTP status codes (200 OK, 201 Created, 404 Not Found)  
- Supports partial matches when searching by author or title  
- Simple JSON file-based storage for learning purposes  