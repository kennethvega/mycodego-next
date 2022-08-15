// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

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
const auth = getAuth();
const db = getFirestore();

export { app, db, auth };

// helper function

export async function getUserWithUsername(userName) {
  const q = query(
    collection(db, "users"),
    where("username", "==", userName.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
}

export async function getUserDoc(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const userDoc = await getDocs(q);
  return userDoc;
}
