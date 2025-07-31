// Import Firebase SDKs (modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

//Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCSXgYAt1x5ZkC02KHadJQ3D3dD3jpdNP0",
    authDomain: "my-firebase-crud-dee78.firebaseapp.com",
    databaseURL: "https://my-firebase-crud-dee78-default-rtdb.firebaseio.com",
    projectId: "my-firebase-crud-dee78",
    storageBucket: "my-firebase-crud-dee78.appspot.com",
    messagingSenderId: "1003685141784",
    appId: "1:1003685141784:web:a52bb72fc7c8e6167e526d"
};

//Initialize Firebase and Database
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.getElementById("feedbackForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const message = document.getElementById("message").value.trim();
    const responseMsg = document.getElementById("responseMessage");

    if (!username || !message) {
        responseMsg.textContent = "All fields are required.";
        responseMsg.style.color = "red";
        return;
    }

    try {
        const feedbackRef = ref(db, "feedbacks");
        await push(feedbackRef, { username, message });
        responseMsg.textContent = "Feedback submitted successfully!";
        responseMsg.style.color = "green";

        document.getElementById("feedbackForm").reset();
    } catch (error) {
        responseMsg.textContent = "Error submitting feedback.";
        responseMsg.style.color = "red";
        console.error(error);
    }
});