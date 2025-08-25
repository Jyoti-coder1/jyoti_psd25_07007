# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Toggle Visibility Using useReducer in React

## Title
Building a Toggle Visibility Component with useReducer in React

## Overview
This project demonstrates how to use the *useReducer* hook in React for simple state management.  
We build a small application where clicking a button toggles the visibility of a message.

---

## Problem Statement
Create a React application that uses useReducer to toggle the visibility of a message.

### Requirements:
- *State Initialization*: Start with { isVisible: false }.
- *Reducer Function*: Handle one action TOGGLE_VISIBILITY to flip the value.
- *Dispatching Actions*: Clicking a button dispatches the toggle action.
- *Conditional Rendering*: Show "Hello, World!" only when isVisible is true.

---

## Steps to Run the Project

1. *Create App with Vite*
   npm create vite@latest toggle-visibility-app
   cd toggle-visibility-app
   npm install
   npm run dev