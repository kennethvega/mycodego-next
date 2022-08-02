// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-q7j694umPGdAlIzr5KFqU2sF-3k31Wg",
  authDomain: "devdocs-3b716.firebaseapp.com",
  projectId: "devdocs-3b716",
  storageBucket: "devdocs-3b716.appspot.com",
  messagingSenderId: "141122571268",
  appId: "1:141122571268:web:e799e9cf10e2e8200db951",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { db, auth };
