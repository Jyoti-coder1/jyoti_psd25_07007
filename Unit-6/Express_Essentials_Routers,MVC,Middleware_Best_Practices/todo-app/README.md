# Todo App (Express + JSON file) — MVC Example

## Overview
Small Todo management API using Express.js and a JSON file (db.json) as the datastore. Follows basic MVC structure: models/, controllers/, routes/.

Supports:
- Create, Read, Update, Delete todos
- Partial, case-insensitive search by title
- Updates and deletes using URL params
- Graceful errors and 404 for undefined routes

## Setup

1. Clone / create project folder and paste files as described.
2. Install dependencies:
```terminal
mkdir todo-app
cd todo-app
npm install
npm run dev   # auto-restart with nodemon
# or
npm start
