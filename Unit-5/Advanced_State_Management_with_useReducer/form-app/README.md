# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Handling Form Data with useReducer in React

## Overview
This assignment focuses on using the *useReducer hook* in React to manage form data efficiently.  
We implement a simple form where users can input their *email* and *password*. The application utilizes useReducer to handle state management for the form data, allowing a more structured and predictable approach.

By completing this assignment, we gain practical experience in leveraging *useReducer* for managing state logic in React applications.

---

## Problem Statement
- Use the useReducer hook to handle the form data in a React application.
- Create a form that takes:
  - *Email* from an input tag of type email
  - *Password* from an input tag of type password
- On *page load*, show:
  ```html
  <div>No details found</div>