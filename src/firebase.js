// Import the functions you need from the SDKs you need

import {initializeApp} from 'firebase/app';
import { getDatabase ,ref, set } from "firebase/database"; // Import getDatabase function
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAUeXki49WuXSKBYl9eHOag0xltY8ua22Y",
    authDomain: "database-140d8.firebaseapp.com",
    databaseURL: "https://database-140d8-default-rtdb.firebaseio.com",
    projectId: "database-140d8",
    storageBucket: "database-140d8.appspot.com",
    messagingSenderId: "916771368403",
    appId: "1:916771368403:web:94a3ec283854411f911326",
    measurementId: "G-T81P16B086"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig); const auth = getAuth(app);
const database = getDatabase(app); // Initialize and export the Realtime Database
export { app, auth, database, set, ref };
export default app;