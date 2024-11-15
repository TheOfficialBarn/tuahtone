// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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

let app;
if (typeof window !== 'undefined') {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
}

const auth = typeof window !== 'undefined' ? getAuth(app) : null;
const db = typeof window !== 'undefined' ? getFirestore(app) : null;

export { app, auth, db };


