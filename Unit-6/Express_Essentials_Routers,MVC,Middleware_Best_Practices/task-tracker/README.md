# Task Tracker App (Express.js)

## Overview
A simple backend API to manage tasks with tags, priority, and status.  
Supports CRUD and filtering by tag. Data stored in tasks.json.

---

## Setup Instructions

1. Clone the repository:
Go to terminal
mkdir task-tracker
cd task-tracker

2. Install dependencies:
npm init -y
npm install express
npm install --save-dev nodemon

3. Run in development mode (auto-restart with nodemon):
npm run dev

4. Or run normally:
npm start
Server runs on http://localhost:3000


---

### API Endpoints

#### Get all tasks
GET /tasks
Returns all tasks in tasks.json.

#### Get task by ID
GET /tasks/:id

#### Filter tasks by tag
GET /tasks/filter?tag=frontend

#### Create a new task
POST /tasks
Content-Type: application/json

{
  "title": "Build login page",
  "description": "Create login page UI",
  "tag": "frontend",
  "priority": "high",
  "status": "pending"
}

#### Update a task
PUT /tasks/:id
Content-Type: application/json

{
  "title": "Update login page",
  "priority": "medium"
}

#### Delete a task
DELETE /tasks/:id

#### Error Handling

Undefined routes → 404 Not Found

Missing task or invalid ID → 404

Invalid input → 400 Bad Request



---

#### Example tasks.json

[
  {
    "id": 1,
    "title": "Build login page",
    "description": "Create login page UI",
    "tag": "frontend",
    "priority": "high",
    "status": "pending"
  },
  {
    "id": 2,
    "title": "Setup database",
    "description": "Configure MongoDB",
    "tag": "backend",
    "priority": "medium",
    "status": "pending"
  }
]