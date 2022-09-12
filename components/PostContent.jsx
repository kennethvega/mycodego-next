import React from "react";
import styles from "./PostContent.module.scss";
import DOMPurify from "dompurify";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from "react-icons/ai";
import { BiCommentDetail, BiEdit } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
const PostContent = ({ post }) => {
  const d = new Date(post.createdAt);
  const date = d.toLocaleDateString("en-US");
  const { user } = useAuthContext();
  return (
    <div className={styles["grid-container"]}>
      <div className={styles.icons}>
        <AiOutlineHeart className={styles.heart} />
        <BiCommentDetail className={styles.comment} />
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.subtitle}>
          <div className={styles.info}>
            <p>
              Author:
              {post.photoURL && (
                <Image
                  src={post.photoURL}
                  width={15}
                  height={15}
                  alt="author image"
                  className={styles["small-image"]}
                />
              )}
              <Link href={`/${post.username}`}>{post.username}</Link>
            </p>
          </div>
          <p>{date.padStart(2, "0")}</p>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        ></div>
      </div>
      {user?.displayName === post.username && (
        <div className={styles.edit}>
          <div className={styles.icons}>
            <BiEdit className={styles["edit-btn"]} />
            <AiFillDelete className={styles.delete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContent;
