# Book Management System (Express.js)

## Overview
Digital library backend:
- Admin: manage books (CRUD)
- Reader: borrow & return books
- Borrowing restricted until returned & 3-day return rule enforced
- Middleware for request logging and transaction logging

## Setup
```terminal
npm install
npm run dev   # auto-reload
npm start     # production
Default port: 3000 (can be changed with PORT env variable)

Ensure db.json exists in the project root:
[]


---

Admin Routes (Manage Books)


Add a new book

POST /admin/books
Content-Type: application/json
Body:
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "genre": "Fiction",
  "publishedYear": 1925
}

Get all books

GET /admin/books

Update a book
PATCH /admin/books/:id
Content-Type: application/json
Body (any of the fields):
{
  "title": "Updated Title",
  "author": "Updated Author",
  "genre": "Mystery",
  "publishedYear": 1930
}

Delete a book
DELETE /admin/books/:id


---

Reader Routes (Borrow & Return)

Get available books

GET /reader/books

Borrow a book
POST /reader/borrow/:id
Content-Type: application/json
Body:
{
  "readerName": "John Doe"
}

Rules:
Book must be available
borrowedBy and borrowedDate updated
Status changes to "borrowed"

Return a book
POST /reader/return/:id
Content-Type: application/json
Body:
{
  "readerName": "John Doe"
}

Rules:
Book cannot be returned within 3 days of borrowing
Status changes to "available"
borrowedBy and borrowedDate cleared



---

Middleware

Logger Middleware (loggerMiddleware)
Logs every request method, URL, and timestamp

[2025-03-24T10:00:00.000Z] POST /admin/books
Return Check Middleware (returnCheckMiddleware)
Prevents book return within 3 days
{ "error": "Book cannot be returned within 3 days of borrowing." }

Transaction Logger (transactionLogger)

Logs borrow/return transactions
[2025-03-24T11:00:00.000Z] John Doe borrowed "The Great Gatsby"
[2025-03-27T14:15:20.000Z] John Doe returned "The Great Gatsby"



---

Error Handling
Book not found → 404
Borrowed book cannot be borrowed again → 400
Early return (<3 days) → 400
Missing fields (Admin/Reader) → 400
Undefined routes → "404 Not Found"