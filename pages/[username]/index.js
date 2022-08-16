import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  getUserDocWithUsername,
  getUserPost,
  postToJSON,
} from "../../lib/firebase-config";
import { db } from "../../lib/firebase-config";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
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

  const userDoc = await getUserDocWithUsername(username);

  // JSON serialization data

  let user = null;
  let post = null;
  // If no user, short circuit to 404 page
  console.log(userDoc);
  if (userDoc) {
    user = userDoc;
    post = await getUserPost(username);
  }

  return {
    props: { user, post },
  };
}

export default UserProfilePage;
