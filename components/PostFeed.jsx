import React from "react";
import DocumentCard from "./DocumentCard";
import styles from "./PostFeed.module.scss";
const PostFeed = ({ posts, admin }) => {
  return posts ? (
    posts.map((post) => (
      <DocumentCard post={post} key={post.slug} admin={admin} />
    ))
  ) : (
    <p>No documents</p>
  );
};

export default PostFeed;
