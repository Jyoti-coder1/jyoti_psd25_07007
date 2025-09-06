import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAdoyv_ZldB6oQrcniMxuwJujnk9OV0wc4",
  authDomain: "photogallery-c6ab7.firebaseapp.com",
  projectId: "photogallery-c6ab7",
  storageBucket: "photogallery-c6ab7.firebasestorage.app",
  messagingSenderId: "112874733019",
  appId: "1:112874733019:web:7ce81a341838a85bde3bfe",
  measurementId: "G-SV6XQ8HLJN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);