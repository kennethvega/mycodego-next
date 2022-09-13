import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  getUserDocWithUsername,
  getUserPosts,
  postToJSON,
} from "../../lib/firebase-config.js";

const UserProfilePage = ({ user, posts }) => {
  return (
    <main className="container margin-top-xl">
      <UserProfile userDetail={user} posts={posts} />
      <div className="card-container">
        <PostFeed posts={posts} />
      </div>
    </main>
  );
};

export default UserProfilePage;

export async function getServerSideProps({ query }) {
  // const { id } = query;
  // const userDoc = await getUserDocWithId(id);
  const { username } = query;
  const userDoc = await getUserDocWithUsername(username);
  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  // JSON serialization data
  let user = null;
  let posts = null;
  if (userDoc) {
    user = userDoc.data();
    const postQuery = await getUserPosts(username);
    posts = postQuery.docs.map(postToJSON);

    return {
      props: {
        user,
        posts,
      },
    };
  }
}
