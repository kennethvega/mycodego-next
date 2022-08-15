import React from "react";
import styles from "./DocumentCard.module.scss";
import Link from "next/link";
const DocumentCard = ({ post, key, admin = false }) => {
  return (
    <Link href={`/pages${post.userId}/${post.slug}`}>
      <div className={styles.container}>
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
        <footer className={styles.footer}>
          <Link href={`/${post.username}`}>
            <span>Author: Kenneth Vega</span>
          </Link>
          <span>January 19 2022</span>
        </footer>
      </div>
    </Link>
  );
};

export default DocumentCard;
