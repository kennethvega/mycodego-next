import React from "react";
import styles from "./DocumentCard.module.scss";
import Link from "next/link";
const DocumentCard = ({ post, key, admin = false }) => {
  // formating date
  const d = new Date(post.createdAt);
  const date = d.toLocaleDateString("en-US");
  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className={styles.container}>
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
        <footer className={styles.footer}>
          <span>
            <Link href={`/${post.username}`}>
              <a>Author: {post.username}</a>
            </Link>
          </span>
          <span>{date.padStart(2, "0")}</span>
        </footer>
      </div>
    </Link>
  );
};

export default DocumentCard;
