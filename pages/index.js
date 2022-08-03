import styles from "../styles/home.module.scss";
import { useState } from "react";
import DocumentCard from "../components/DocumentCard";
export default function Home() {
  const user = null;
  const [docs, setDocs] = useState(null);

  return (
    <div className="container">
      <div className={styles["btn-container"]}>
        {user && <button className="btn">Create a doc</button>}
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
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
          <DocumentCard />
        </div>
      </div>
    </div>
  );
}
