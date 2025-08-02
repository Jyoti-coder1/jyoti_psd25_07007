import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js"

// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBCE5Rp4zquXcHr-qA9fk1s4XXcTw4gN-g",
    authDomain: "ideahub-a33d1.firebaseapp.com",
    databaseURL: "https://ideahub-a33d1-default-rtdb.firebaseio.com",
    projectId: "ideahub-a33d1",
    storageBucket: "ideahub-a33d1.firebasestorage.app",
    messagingSenderId: "472723359808",
    appId: "1:472723359808:web:f1a926fb93e6c7aa3bf7a5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const auth = getAuth(app);

  //Export so main.js can use

  export { auth, db};