# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Gemini Chat Widget (React + Gemini API)

A simple, interactive *AI Chat Widget* built with *React* and *Google’s Gemini API*.  
This project demonstrates React Hooks, Context API, asynchronous data fetching, localStorage persistence, error handling, and a clean UI.

---

##  Features

-  *Secure API Key Handling* using .env.local
-  *Chat Widget* with user and AI messages
-  *State Management* using React Context + Reducer
-  *Async Fetching* with error handling & retry logic
-  *Persistence* – Chat history saved in localStorage
-  *Responsive UI* with styled chat bubbles and timestamps
-  *Accessible* (keyboard navigation, ARIA labels)

---

##  Tech Stack

- *React (Vite)*
- *Gemini API* (Google Generative Language API)
- *Context API + Reducer*
- *LocalStorage*
- *Lucide Icons* for chat button

---

##  Project Structure

gemini-chat/ 
│── .env.local
│── package.json
│── vite.config.js
│── public/
│── src/
    ├── App.jsx
    ├── main.jsx
    ├── index.css
    ├── context/ 
        |── ChatContext.jsx
    ├── components/
        ├── ChatbotButton.jsx
        ├── ChatInput.jsx
        ├── ChatMessage.jsx
        |── ChatWindow.jsx

---

## Setup & Installation

1.
npm create vite@latest gemini-chat -- --template react
   cd gemini-chat

2. Install dependencies:

npm install
npm install lucide-react


3. Create a .env.local file in the root directory:

VITE_GEMINI_API_KEY=AIzaSyCNb4jnZnqKio0CsZ_Ekvf5OsZmA2KcRZU


4. Run the development server:

npm run dev




---

## Usage

Open the app in your browser (http://localhost:5173 by default).

Click the chat button at the bottom-right corner.

Type a message → The AI assistant will respond.

Chat history will persist even after refreshing.