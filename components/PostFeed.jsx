import React from "react";
import DocumentCard from "./DocumentCard";

const PostFeed = ({ posts, admin }) => {
  return posts ? (
    posts.map((post, index) => (
      <DocumentCard key={index} post={post} admin={admin} />
    ))
  ) : (
    <p>No documents</p>
  );
};

export default PostFeed;
