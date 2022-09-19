import styles from "../styles/home.module.scss";
import { useAuthContext } from "../hooks/useAuthContext";
import Link from "next/link";
import PostFeed from "../components/PostFeed";
import {
  collectionGroup,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { postToJSON, db } from "../lib/firebase-config";
import { useState } from "react";
export default function Home(props) {
  const [documents, setDocuments] = useState(props.posts);

  const { user } = useAuthContext();

  return (
    <div className="container margin-top-xl">
      <div className={styles["fixed-container"]}>
        <div className={styles["btn-container"]}>
          {user && (
            <Link href="/CreateDoc">
              <button className="btn">Create a doc</button>
            </Link>
          )}
          {!user && (
            <div className={styles.message}>
              <h1>
                Welcome to Mycodego. 👋 This app is a documentation platform for
                developers. Login to create your own coding documentation and
                share it to the world.
              </h1>
            </div>
          )}
        </div>
        <div className={styles["documents-container"]}>
          <input
            type="text"
            className={styles.search}
            placeholder="Search a doc"
          />
        </div>
      </div>
      <div className="card-container">
        <PostFeed posts={documents} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const postQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(postQuery);
  const posts = querySnapshot.docs.map(postToJSON);

  return {
    props: {
      posts,
    },
  };
}
// check in production if this behavior is still on
// 1. heart increment decrement is slow.
// 2.internet disconnection in firebase
