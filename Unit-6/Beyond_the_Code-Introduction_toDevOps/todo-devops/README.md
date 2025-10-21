# Todo API – From Code to Cloud

This project is a *backend-only Todo API* built with Node.js, Express, and MongoDB.  
It is refactored for professional standards and is configured with *CI/CD pipeline* using GitHub Actions, with optional *Docker containerization*.  

The API supports CRUD operations on Todo items and includes *JWT-based user authentication*.

---

## Features

- Clean, modular folder structure:
  - controllers/, routes/, services/, middlewares/, utils/, config/, models/, tests/
- Centralized error handling
- Standardized API responses ({ success, data, message })
- Environment variables managed via .env  
- JWT authentication for secure endpoints
- Fully tested with Jest + Supertest
- CI/CD pipeline with GitHub Actions
- Automatic deployment to Render via Deploy Hook
- Optional Docker support for containerized deployment

---

## Project Structure

todo-devops/ │ ├── src/ │   ├── config/ │   ├── controllers/ │   ├── routes/ │   ├── services/ │   ├── middlewares/ │   ├── utils/ │   ├── models/ │   └── app.js ├── tests/ ├── .github/workflows/ci.yml ├── .env ├── .env.example ├── .gitignore ├── package.json ├── Dockerfile (optional) ├── .dockerignore (optional) └── README.md

---

## Environment Variables

Create a .env file in the root folder with the following variables:

```env
PORT=<YOUR_PORT>
MONGO_URI=<YOUR_MONGODB_URI>
JWT_SECRET=<YOUR_JWT_SECRET>
NODE_ENV=development
RENDER_DEPLOY_HOOK_URL=<YOUR_RENDER_DEPLOY_HOOK>

.env.example is included for reference (safe to commit).

Do not commit your real .env file.



---

### Installation

1. Open the terminal
mkdir todo-devops
cd todo-devops

2. Install dependencies:

npm install

3. Start development server:



npm run dev

4. Open in browser or Postman: http://localhost:<YOUR_PORT>/api/todos



---

### Testing

Run integration tests with:

npm test

Tests are built using Jest and Supertest.

CI workflow runs these tests automatically on every push to main.



---

## CI/CD Pipeline

.github/workflows/ci.yml automatically runs:

Node setup

Dependency installation

Tests execution

Deployment to Render if tests pass


Deployment uses Render Deploy Hook stored as GitHub Secret RENDER_DEPLOY_HOOK_URL



---

## Docker (Optional)

To build and run the container:

docker build -t todo-api .
docker run -p <YOUR_PORT>:<YOUR_PORT> todo-api

Dockerfile uses node:18-alpine base image

.dockerignore excludes node_modules, .git, .env



---

## Authentication

API endpoints are protected using JWT tokens

Use Authorization: Bearer <YOUR_JWT_TOKEN> header for protected routes


---


## Validation

Folder structure, naming conventions, and coding standards ✅

Centralized error handling ✅

CI/CD workflow runs tests and deploys automatically ✅

Docker containerization supported ✅

Fully functional backend API with JWT auth and CRUD ✅

--
