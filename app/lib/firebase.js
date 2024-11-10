// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Import getAuth from Firebase
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvXbN8bek0oKCZHN9Fxr4J6JEr7SuQLgQ",
  authDomain: "tuahtone-93fdc.firebaseapp.com",
  projectId: "tuahtone-93fdc",
  storageBucket: "tuahtone-93fdc.firebasestorage.app",
  messagingSenderId: "522167353626",
  appId: "1:522167353626:web:18e01d1ecc65cd5de3eca3",
  measurementId: "G-50BXMVMKY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // Initialize Firebase Authentication and get a reference to the servicea
const db = getFirestore(app);

export { app, analytics, auth, db };
