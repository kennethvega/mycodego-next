import React from "react";
import styles from "./DocumentCard.module.scss";
import Link from "next/link";
import CapitalizeStringName from "../helpers/capitalizeStringName";
const DocumentCard = ({ post, admin = false }) => {
  // formating date
  const d = new Date(post.createdAt);
  const date = d.toLocaleDateString("en-US");
  // format name
  const name = CapitalizeStringName(post);
  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className={styles.container}>
        <h3>{post.title}</h3>
        <p>{post.summary}</p>
        <footer className={styles.footer}>
          <span>
            <Link href={`/${post.username}`}>
              <a>
                Author: <span>@{name.split(" ")}</span>
              </a>
            </Link>
          </span>
          <span>{date.padStart(2, "0")}</span>
        </footer>
      </div>
    </Link>
  );
};

export default DocumentCard;
