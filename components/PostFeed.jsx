import React from "react";
import DocumentCard from "./DocumentCard";

const PostFeed = ({ posts }) => {
  return posts ? (
    posts.map((post) => <DocumentCard key={post.slug} post={post} />)
  ) : (
    <p>No documents</p>
  );
};

export default PostFeed;
