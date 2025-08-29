# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Creating a Responsive UI Using Chakra UI

## Overview
This project demonstrates how to build a *responsive testimonials section* using *React (Vite) and Chakra UI*.  
It adapts seamlessly across *mobile* and *desktop* devices, with a design that uses speech-bubble styled testimonial cards.

## Features
- Responsive layout (stacked vertically on mobile, 3-column grid on desktop).
- Reusable testimonial card component with speech bubble design.
- Built using *React 18 + Chakra UI v2*.
- Single App.css for global styling.
- Clean, modular structure with components/ and pages/.

## Tech Stack
- *React 18*
- *Chakra UI v2*
- *Vite*
- *Framer Motion* (used internally by Chakra)

##  Project Structure

chakra-responsive/ ┣ src/ ┃ ┣ components/ ┃ ┃ ┗ TestimonialCard.jsx ┃ ┣ pages/ ┃ ┃ ┗ Home.jsx ┃ ┣ App.jsx ┃ ┣ App.css ┃ ┗ main.jsx

##  Setup Instructions
1. Clone the repository:
   ```bash
   npm create vite@latest chakra-responsive -- --template react
   cd chakra-responsive

2. Install dependencies:

npm install react@18 react-dom@18
npm install @chakra-ui/react@2 @chakra-ui/icons @emotion/react @emotion/styled framer-motion


3. Run the project:

npm run dev


4. Open your browser at http://localhost:5173.



## Responsiveness

Mobile View → Testimonial cards stack vertically.

Desktop View → Cards display in a 3-column layout.


## Learnings

Practiced responsive design with Chakra UI (SimpleGrid, responsive props).

Learned how to design speech-bubble styled components.

Reinforced concepts of components, props, and layout management.

Reviewed project setup using Vite with Chakra UI.



---

Submission Complete – Project meets all requirements.