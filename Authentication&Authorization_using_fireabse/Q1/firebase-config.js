// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAvLqWXOhQK-Pg4945XRnCKcJToeilibM",
    authDomain: "authdashboardapp-e4ff6.firebaseapp.com",
    databaseURL: "https://authdashboardapp-e4ff6-default-rtdb.firebaseio.com",
    projectId: "authdashboardapp-e4ff6",
    storageBucket: "authdashboardapp-e4ff6.firebasestorage.app",
    messagingSenderId: "485400645179",
    appId: "1:485400645179:web:69fe44f794d15b4ab7561e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);