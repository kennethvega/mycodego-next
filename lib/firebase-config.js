// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  collectionGroup,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_TOKEN,
  authDomain: "devdocs-3b716.firebaseapp.com",
  projectId: "devdocs-3b716",
  storageBucket: "devdocs-3b716.appspot.com",
  messagingSenderId: "141122571268",
  appId: process.env.NEXT_PUBLIC_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(app);

export { app, db, auth, storage };

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
    where("username", "==", username.toLowerCase()),
    limit(1)
  );
  const snapShot = await getDocs(q);
  const data = snapShot.docs[0];

  return data;
}

export async function getUserPosts(username) {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );
  const snapShot = await getDocs(q);
  const userData = snapShot.docs[0];
  //

  const postQuery = query(
    collection(db, `users/${userData.id}/posts`),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );
  const postDetails = await getDocs(postQuery);
  return postDetails;
}

export async function getPost(slug) {
  const itemRef = query(
    collectionGroup(db, "posts"),
    where("slug", "==", slug)
  );
  const post = await getDocs(itemRef);
  return post;
}

export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}
// storage
export async function upload(file, userDetail) {
  const fileRef = ref(storage, userDetail.userId);
  const snapshot = await uploadBytes(fileRef, file);
}
