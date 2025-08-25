# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# Handling College Form Data with useReducer in React

## Overview
This project demonstrates how to manage *complex form state* in React using the *useReducer hook*.  
It is a simple application where users can input details about a college, such as name, establishment year, address, and courses offered. The form data is stored in state using useReducer, displayed below the form, and can be reset back to the initial state.  

This assignment provided hands-on experience in:
- Managing nested form data
- Defining reducers and action types
- Handling reset functionality
- Error handling in reducers

---

## Problem Statement
You are tasked with completing a form application for adding colleges to the state.  

The requirements include:  
- Inputs for *College Name, Establishment Year, Address (Building, Street, City, State, Pincode, Landmark, Latitude, Longitude), and Courses Offered (as a list)*  
- Using *useReducer* to manage form state  
- Implementing *action types* for updating state  
- Displaying form data below the form after submission  
- Implementing *reset functionality* using reset action type  
- Adding *error handling* in reducer with default case throwing "invalid action type"

The form state follows this structure:

```js
const formState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: "",
    state: "",
    locality: {
      pinCode: "",
      landmark: ""
    },
    coordinates: { latitude: "", longitude: "" }
  },
  courses_offered: []
};