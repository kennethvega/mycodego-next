import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useAuthContext } from "../hooks/useAuthContext";
import { db } from "../lib/firebase-config";
import styles from "./Hearts.module.scss";
const Hearts = ({ hearts, slug, id }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const heartRef = doc(db, "users", `${id}`, "posts", `${slug}`);
  const handleHearts = async (e) => {
    e.preventDefault();
    if (hearts?.includes(user.uid)) {
      await updateDoc(heartRef, {
        hearts: arrayRemove(user.uid),
      }).catch((err) => {
        console.log(err);
      });
      refreshData();
    } else {
      await updateDoc(heartRef, {
        hearts: arrayUnion(user.uid),
      }).catch((err) => {
        console.log(err);
      });
      refreshData();
    }
  };
  return (
    <div className={styles.container} onClick={handleHearts}>
      {hearts?.includes(user.uid) ? (
        <AiFillHeart className={styles["icon-fill"]} />
      ) : (
        <AiOutlineHeart className={styles.icon} />
      )}

      <p>{hearts.length}</p>
    </div>
  );
};

export default Hearts;
