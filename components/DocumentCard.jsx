import React from "react";
import styles from "./DocumentCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import CapitalizeStringName from "../helpers/CapitalizeStringName";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
const DocumentCard = ({ post }) => {
  // formating date
  const d = new Date(post.createdAt);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  const date = `${month}, ${day}, ${year}`;
  // format name

  const displayName = CapitalizeStringName(post);
  const defaultImage = "/blank-profile.png";
  // word count & minutes to read
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Link href={`/${post.username}`}>
              <a className={styles.info}>
                <Image
                  src={post.photoURL ? post.photoURL : defaultImage}
                  width={25}
                  height={25}
                  alt="author-image"
                  className={styles.image}
                />
                <span className={styles.username}>{displayName}</span>
              </a>
            </Link>
            <span className={styles.date}>{date.padStart(2, "0")}</span>
          </div>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </div>

        <footer className={styles.footer}>
          <div className={styles.icons}>
            <AiOutlineHeart className={styles.icon} />
            <span>{post.hearts ? post.hearts.length : "0"} reactions</span>
            <BiCommentDetail className={styles.comment} />{" "}
            <span>{post.comments ? post.comments.length : "0"} comments</span>
          </div>

          <span className={styles.read}>
            {wordCount} words. {minutesToRead} min read
          </span>
        </footer>
      </div>
    </Link>
  );
};

export default DocumentCard;
