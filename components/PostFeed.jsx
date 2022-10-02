import React from "react";
import DocumentCard from "./DocumentCard";

const PostFeed = ({ posts, user }) => {
  return posts ? (
    posts.map((post) => (
      <DocumentCard key={post.slug} post={post} userDetail={user} />
    ))
  ) : (
    <p>No documents</p>
  );
};

export default PostFeed;
