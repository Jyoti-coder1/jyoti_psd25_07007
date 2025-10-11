// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCSXgYAt1x5ZkCO2KHadJQ3D3dD3jpdNP0",
    authDomain: "my-firebase-crud-dee78.firebaseapp.com",
    databaseURL: "https://my-firebase-crud-dee78-default-rtdb.firebaseio.com",
    projectId: "my-firebase-crud-dee78",
    storageBucket: "my-firebase-crud-dee78.appspot.com",
    messagingSenderId: "1003685141784",
    appId: "1:1003685141784:web:fc55c21f2e3a7e6f7e526d"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, set, onValue, remove };