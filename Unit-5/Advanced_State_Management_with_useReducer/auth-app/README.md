# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React Comprehensive Application

## Overview
This project is a *comprehensive React application* that demonstrates:

- *Authentication*: Users can register, login, and logout securely.
- *Private Routes*: Only authenticated users can access protected pages.
- *Form Handling*: User registration and login forms with validation.
- *State Management (useReducer)*: Used for managing authentication state.
- *Context API*: Provides global state for user authentication.
- *External API Integration*: Fetches country data from [First.org API](https://api.first.org/data/v1/countries).
- *Search Functionality*: Search countries with debounce (prevents excessive API calls).
- *Pagination & Infinite Scroll*: Users can toggle between two ways of viewing search results.
- *Theme Toggle*: Dark and Light mode support.
- *Error Handling*: Gracefully handles invalid actions and API failures.

---

## Features
- Register & Login forms (with validation).  
- Logout functionality.  
- Private routes to restrict access.  
- Search with *debounce (500ms)*.  
- *Pagination* OR *Infinite Scroll* toggle.  
- Dark/Light theme toggle.  
- Error handling with clear messages.  

---

## Tech Stack
- *React + Vite*  
- *React Router DOM*  
- *Context API & useReducer*  
- *Fetch API*  

---

## Project Structure
src/ 
    components/
        # Reusable components (Navbar, CountryList, Pagination) 
    context/
        # AuthContext with useReducer
    pages/
    # Pages (Home, Login, Register, Search)
    App.jsx 
        # Routing + Theme toggle
    main.jsx
        # Entry point
    App.css
        # Styles