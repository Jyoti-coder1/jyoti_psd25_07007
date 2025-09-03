# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# useToggleItems Hook Assignment

## Overview
This project demonstrates a custom React Hook called *useToggleItems*.  
The hook allows toggling between items of an array in sequence.

## Problem Statement
Implement a hook:
```js
const [state, toggleState] = useToggleItems(["A", "B", "C"], 1);

state → current item (starts from index = 1 → "B")

toggleState() → cycles items: B → C → A → B → ...


Example

Initial: B

Click Toggle → C

Click Toggle → A

Click Toggle → B


## Files Structre

src/hooks/useToggleItems.js → Custom Hook

src/App.jsx → Using the hook

src/App.css → Single CSS file for styling


## Run Project

npm create-vite@latest toggle-app --template react
cd toggle-app
npm install
npm run dev

## Observations

Learned how to create and reuse custom hooks.

Practiced state management inside hooks.