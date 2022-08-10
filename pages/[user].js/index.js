import React from "react";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";

const UserProfilePage = ({ user, posts }) => {
  return (
    <main>
      <UserProfile user={user} />
      <PostFeed post={posts} />
    </main>
  );
};

export default UserProfilePage;
