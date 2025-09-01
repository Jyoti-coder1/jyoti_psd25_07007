import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyB1tYCMc1Zu-fKVHcQFo5EtbPzKspRIvmU",
  authDomain: "projecttrackerapp-7c712.firebaseapp.com",
  databaseURL: "https://projecttrackerapp-7c712-default-rtdb.firebaseio.com",
  projectId: "projecttrackerapp-7c712",
  storageBucket: "projecttrackerapp-7c712.firebasestorage.app",
  messagingSenderId: "317150821462",
  appId: "1:317150821462:web:77417c1f34d911cc078ff7",
  measurementId: "G-HT2TDG26JE"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
