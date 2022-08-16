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
  orderBy,
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
// used in useSignup Hook
export async function checkUserWithUsername(userName) {
  const q = query(
    collection(db, "users"),
    where("username", "==", userName.toLowerCase())
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.length > 0;
}

export async function getUserDocWithUsername(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
}

// get userpost ----> users ---> where username == username then ---> posts where published, == true

export async function getUserPost(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username.toLowerCase())
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log("data:", data);
  data.map(async (elem) => {
    const postQuery = query(collection(db, `users/${elem.id}/posts`));
    const postDetails = await getDocs(postQuery);
    const postInfo = postDetails.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return postInfo;
  });
}
