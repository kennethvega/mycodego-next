import React from "react";
import UserProfile from "../../components/UserProfile";
import PostFeed from "../../components/PostFeed";
import {
  getUserDocWithId,
  getUserPosts,
  postToJSON,
} from "../../lib/firebase-config.js";

const UserProfilePage = ({ posts, user }) => {
  return (
    <main className="container margin-top-xl">
      <UserProfile userDetail={user} />
      <div className="card-container">
        <PostFeed posts={posts} />
      </div>
    </main>
  );
};

export default UserProfilePage;

export async function getServerSideProps({ query }) {
  const { id } = query;
  const userDoc = await getUserDocWithId(id);
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
    const postQuery = await getUserPosts(id);
    posts = postQuery.docs.map(postToJSON);

    return {
      props: {
        posts,
        user,
      },
    };
  }
}
