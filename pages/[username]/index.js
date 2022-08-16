import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  getUserDocWithUsername,
  getUserPost,
  postToJSON,
} from "../../lib/firebase-config";

const UserProfilePage = ({ posts, user }) => {
  return (
    <main>
      <UserProfile userDetail={user} />
      <PostFeed posts={posts} />
      {console.log(posts)}
    </main>
  );
};

export default UserProfilePage;
export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserDocWithUsername(username);
  // JSON serialization data
  let user = null;
  let posts = null;
  // If no user, short circuit to 404 page
  if (userDoc) {
    user = userDoc.data();
    const postQuery = await getUserPost(username);
    posts = postQuery.docs.map(postToJSON);
  }

  return {
    props: {
      posts,
      user,
    },
  };
}
