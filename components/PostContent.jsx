import React, { useState } from "react";
import styles from "./PostContent.module.scss";
import DOMPurify from "dompurify";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiFillDelete } from "react-icons/ai";
import { BiCommentDetail, BiEdit } from "react-icons/bi";
import Modal from "./Modal";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../lib/firebase-config";
import { useRouter } from "next/router";
import Loader from "./Loader";
import { toast } from "react-toastify";
import Hearts from "./Hearts";
const PostContent = ({ post }) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const itemRef = doc(db, "users", `${post.id}`, "posts", `${post.slug}`);
    await deleteDoc(itemRef);
    setLoading(false);
    await router.push("/");
    setOpenModal(false);
    toast.success("Successfully deleted post!");
  };

  const d = new Date(post.createdAt);
  const date = d.toLocaleDateString("en-US");
  const { user } = useAuthContext();

  return (
    <div className={styles["grid-container"]}>
      <div className={styles.icons}>
        <Hearts hearts={post.hearts} slug={post.slug} id={post.id} />
        <BiCommentDetail className={styles.comment} />
      </div>

      <div className={styles.content}>
        {user?.displayName === post.username && (
          <div className={styles.edit}>
            <div className={styles["edit-buttons"]}>
              <Link href={`/editpost/${post.slug}`}>
                <a>
                  <BiEdit className={styles["edit-btn"]} title="edit post" />
                </a>
              </Link>
              <AiFillDelete
                className={styles.delete}
                title="delete post"
                onClick={() => setOpenModal(true)}
              />
            </div>
          </div>
        )}
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles["info-container"]}>
          <p>
            Author: <Link href={`/${post.username}`}>{post.username}</Link>
          </p>
          <p>{date.padStart(2, "0")}</p>
        </div>
        <div
          className={styles["content-container"]}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
        ></div>
      </div>

      <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
        <h2 className={styles["modal-title"]}>
          Are you sure you want to delete this document ?
        </h2>
        <div className={styles["btn-container"]}>
          {loading ? (
            <button className="btn center-items" disabled>
              Loading <Loader />
            </button>
          ) : (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button className="btn-outline" onClick={() => setOpenModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostContent;
