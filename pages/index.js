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
export default function Home({ posts }) {
  const { user } = useAuthContext();

  return (
    <div className="container margin-top-xl">
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
        {/* <h3 className={styles["post-title"]}>Documentations</h3> */}
        <div className="card-container">
          <PostFeed posts={posts} />
        </div>
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
