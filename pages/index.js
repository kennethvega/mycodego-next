import styles from "../styles/home.module.scss";
import { useState } from "react";
import DocumentCard from "../components/DocumentCard";
import { useAuthContext } from "../hooks/useAuthContext";
import Link from "next/link";
import PostFeed from "../components/PostFeed";

export default function Home() {
  const [docs, setDocs] = useState(null);
  const { user, authIsReady } = useAuthContext();

  return (
    <div className="container">
      <div className={styles["btn-container"]}>
        {user && (
          <Link href="/CreateDoc">
            <button className="btn">Create a doc</button>
          </Link>
        )}
        {!user && (
          <div className={styles.message}>
            <h1>
              Welcome to DeveloperDocs. 👋 This app is a documentation platform
              for developers. Login to create your own coding documentation and
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
        <h3 className={styles["post-title"]}>Documentations</h3>
        <div className={styles["card-container"]}>
          <PostFeed />
        </div>
      </div>
    </div>
  );
}
