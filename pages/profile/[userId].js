import React from "react";
import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";

export async function getServerSideProps({ query }) {
  const { userName } = query;

  const userDoc = await getUserWithUsername(username);

  return {
    props: { user, posts },
  };
}

const UserProfilePage = ({ user, posts }) => {
  return (
    <main>
      <UserProfile userDetail={user} />
      <PostFeed post={posts} />
    </main>
  );
};

export default UserProfilePage;
