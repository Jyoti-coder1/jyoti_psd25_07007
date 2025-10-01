# Employee Management System (Role-Based)

## Overview
A backend API to manage employees with *role-based access control*:

- *Admin*: Can perform all CRUD operations (create, read, update, delete)
- *HR*: Can only view employees and update their details

Employee fields:

json
{
  "id": 1,
  "name": "Alice Johnson",
  "position": "Developer",
  "department": "IT",
  "salary": 50000,
  "status": "active"
}

Roles are simulated via headers:

x-role: admin
x-role: hr


---

## Project Setup

1. Go to terminal
mkdir employee-management
cd employee-management

2. Install dependencies

npm install

3. Run the server

Development mode (auto-reload with nodemon):


npm run dev

Production mode:

npm start

Server runs on:

http://localhost:3000

4. employees.json

Keep empty initially ([]).

Example employee entry for reference:


[
  {
    "id": 1,
    "name": "Alice Johnson",
    "position": "Developer",
    "department": "IT",
    "salary": 50000,
    "status": "active"
  }
]


---

### Middleware

#### Logger Middleware
Logs every request with method, URL, and timestamp:
[2025-10-01T10:00:00.000Z] GET /employees

#### Role Check Middleware
Checks x-role header
Denies access if role is insufficient

---

### API Endpoints

1. Get All Employees

GET /employees
Headers: x-role: admin OR hr

Returns all employees

Example response:


[
  {
    "id": 1,
    "name": "Alice Johnson",
    "position": "Developer",
    "department": "IT",
    "salary": 50000,
    "status": "active"
  }
]

2. Add New Employee (Admin Only)

POST /employees
Headers: x-role: admin
Content-Type: application/json
Body:
{
  "name": "John Doe",
  "position": "HR Manager",
  "department": "Human Resources",
  "salary": 60000,
  "status": "active"
}

Response: newly created employee with id


3. Update Employee (Admin or HR)

PUT /employees/:id
Headers: x-role: admin OR hr
Content-Type: application/json
Body: { any fields to update, e.g., "status": "inactive" }

4. Delete Employee (Admin Only)

DELETE /employees/:id
Headers: x-role: admin

Returns 204 No Content if successful



---

### Error Handling

Missing role header → 401 Unauthorized

Insufficient permissions → 403 Forbidden

Employee not found → 404 Not Found

Undefined routes → 404 Not Found

Invalid request body → 400 Bad Request



---

### Example cURL Requests

Get all employees (HR)

curl -H "x-role: hr" http://localhost:3000/employees

Add employee (Admin)

curl -X POST -H "Content-Type: application/json" -H "x-role: admin" \
-d '{"name":"John Doe","position":"HR Manager","department":"HR","salary":60000,"status":"active"}' \
http://localhost:3000/employees

Update employee

curl -X PUT -H "Content-Type: application/json" -H "x-role: hr" \
-d '{"status":"inactive"}' http://localhost:3000/employees/1

Delete employee

curl -X DELETE -H "x-role: admin" http://localhost:3000/employees/1


---

Notes

employees.json can be left empty ([]) initially; API works with empty data.

All actions are logged to console via logger middleware.

Role-based access ensures HR cannot create or delete employees.