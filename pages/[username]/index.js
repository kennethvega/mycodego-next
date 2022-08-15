import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../lib/firebase-config";
const UserProfilePage = ({ post, user }) => {
  return (
    <main>
      <UserProfile userDetail={user} />
      <PostFeed post={post} />
    </main>
  );
};

export async function getServerSideProps({ query }) {
  const { username } = query;

  // const q = query(
  //   collection(db, "users"),
  //   where("username", "==", username.toLowerCase())
  // );
  // const userDoc = await getDocs(q);
  const userDoc = await getUserDoc(username);
  // JSON serialization data
  let user = null;
  let post = null;
  if (userDoc) {
    user = userDoc.data();
    const postQuery = query(
      collection(db, "users", "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc")
    );
    post = await getDocs(postQuery);
  }

  return {
    props: { user, post },
  };
}

export default UserProfilePage;
