# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# useTimer Custom Hook

## Overview
This project demonstrates a *reusable custom hook* in React called useTimer.  
The hook provides functionality to start, stop, and reset a timer, making it reusable across multiple components.

## Features
- **Custom Hook (useTimer)** – Encapsulates timer logic.
- *Start, Stop, Reset* – Simple control buttons.
- *Reusable* – Timer logic is separated from UI.
- *Clean-up* – Uses useEffect to clear intervals when unmounted.

## Concepts Used
- Vite + React Setup
- React Lifecycle with useEffect
- useState and useRef
- Reusable Custom Hooks
- Component Composition
- React.memo for performance optimization

## File Structure

src/
┣ hooks/useTimer.js   → Timer hook
┣ components/TimerControls.jsx → Buttons
┣ App.jsx             → Main app
┣ App.css             → Styles


## Installation & Run

1. Create the app using Vite:

npm create vite@latest timer-app -- --template react
cd timer-app
npm install


2. Start development server:

npm run dev


3. Open in browser (default: http://localhost:5173).


## Learnings

Custom Hooks help in extracting and reusing logic.

useRef is useful for storing interval IDs without re-renders.

React.memo optimizes child components by preventing unnecessary renders.

Lifecycle cleanup using useEffect prevents memory leaks.


---