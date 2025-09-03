# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## React Custom Hooks Assignment

### Overview

This project demonstrates how to create and use Custom Hooks in React.
We built a simple form that uses a custom hook called useForm to handle form state, input changes, and reset functionality.

By doing this, we extracted reusable logic from components into a standalone hook, making our React code cleaner and easier to maintain.


---
### Project Structure

custom-hooks-app/
 ┣ src/
 ┃ ┣ components/
 ┃ ┃ ┗ Form.js
 ┃ ┣ hooks/
 ┃ ┃ ┗ useForm.js
 ┃ ┣ App.css
 ┃ ┣ App.jsx
 ┃ ┗ main.jsx
 ┣ index.html
 ┣ package.json


---

### How It Works

useForm.js → A custom hook to manage form state (username, email).

Form.js → Uses useForm to handle input values, submit, and reset.

App.jsx → Main file that renders the form.

App.css → Single CSS file for styling.



---

### Installation & Run

1. Create the app using Vite:

npm create vite@latest custom-hooks-app -- --template react
cd custom-hooks-app
npm install


2. Start development server:

npm run dev


3. Open in browser (default: http://localhost:5173).




---

### Output

A form with username and email fields.

Submitting the form shows an alert with entered values.

After submit, the form resets automatically.