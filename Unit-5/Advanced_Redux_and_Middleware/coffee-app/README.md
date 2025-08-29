# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Coffee List App

This project demonstrates *Redux Middleware Thunk* integration in a React application.  
It fetches coffee data from an API, displays it using *Chakra UI, and allows **sorting* with a sidebar.

---

## Features
- Setup with *React 18 + Vite*  
- *Redux* for state management  
- *Redux Thunk* middleware for async API calls  
- Fetches coffee data from a remote API  
- Sidebar with *sorting options (price low→high, high→low)*  
- Coffee list displayed in a *responsive Chakra UI grid*  
- Clean and minimal styling  

---

## Tech Stack
- [React 18](https://react.dev/)  
- [Redux](https://redux.js.org/)  
- [Redux Thunk](https://github.com/reduxjs/redux-thunk)  
- [Chakra UI](https://chakra-ui.com/)  
- [Vite](https://vitejs.dev/)  

---

## Installation & Setup

### 1. Clone the repo
```bash
npm create vite@latest coffee-app -- --template react
cd coffee-app

2. Install dependencies

npm install

npm install axios 

npm install @chakra-ui/react@2 @chakra-ui/icons @emotion/react @emotion/styled framer-motion

3. Run the development server

npm run dev

---

### Project Structure

src/
│── redux/
│   ├── store.js
│   ├── coffeeReducer.js
│   └── coffeeActions.js
│── components/
│   ├── CoffeeList.jsx
│   └── Sidebar.jsx
│── pages/
│   └── Home.jsx
│── App.jsx
│── App.css
│── main.jsx


---

### API Used

https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-coffee


---
### Learnings

How to configure Redux store with middleware

Writing async thunk actions for API requests

Managing loading, success, and error states

Using Chakra UI for layout and styling

Real-time state updates with sorting
