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

//DOM elements
const tableBody = document.getElementById("user-table-body");
const errorDiv = document.getElementById("error");

//Function to fetch users
function fetchUsers() {
    const dbRef = ref(db);
    get(child(dbRef, "users"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const users = snapshot.val();
                tableBody.innerHTML = ""; // Clear previous rows

                // Loop through each user (even with auto-generated IDs)
                for (let key in users) {
                    const user = users[key];

                    // Create table row
                    const row = document.createElement("tr");
                    row.innerHTML = `
            <td>${user.name || "N/A"}</td>
            <td>${user.email || "N/A"}</td>
          `;
                    tableBody.appendChild(row);
                }
            }
            else {
                errorDiv.textContent = "No user data found in the database.";
            }
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            errorDiv.textContent = "Failed to fetch user data. Please try again.";
        });
}
//Fetch users on page load