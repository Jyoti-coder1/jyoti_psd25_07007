# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Creating a Beautiful Card Using Chakra UI

## Overview
This project demonstrates how to use *Chakra UI* to create a visually appealing and responsive card component in a React application.  
The card includes an avatar, title, description, hashtags, and action buttons, styled with Chakra UI's utilities.

---

## Problem Statement
The task was to:
- Use Chakra UI to design a *card component* with:
  - Rounded corners and shadow (3D effect).
  - A title at the top.
  - An image/avatar in the center.
  - Description text below the image.
  - Hashtags and action buttons.
- Apply custom styles (colors, fonts, spacing).
- Ensure responsiveness across screen sizes.
- Use **only one global CSS file (App.css).
- Keep the code *simple*.

---

## Setup Guidelines

### 1. Environment Setup
Make sure you have *Node.js* and *npm* installed.

### 2. Create the App
```bash
npm create vite@latest chakra-card -- --template react
cd chakra-card
npm install react@18 react-dom@18
npm install @chakra-ui/react@2 @chakra-ui/icons @emotion/react @emotion/styled framer-motion
npm run dev