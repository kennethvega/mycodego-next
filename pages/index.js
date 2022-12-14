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
import { useEffect, useState } from "react";
export default function Home(props) {
  const [documents, setDocuments] = useState(props.posts);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [filters, setFilters] = useState({ s: "" });
  console.log(documents);
  const { user } = useAuthContext();

  // search function
  useEffect(() => {
    if (documents) {
      let docs = documents.filter(
        (doc) =>
          doc.title.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0 ||
          doc.summary.toLowerCase().indexOf(filters.s.toLowerCase()) >= 0
      );
      setFilteredDocs(docs);
    }
  }, [filters]);
  //
  const search = (s) => {
    setFilters({
      s,
    });
  };

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
            onKeyUp={(e) => search(e.target.value)}
          />
        </div>
      </div>

      <div className="card-container">
        <PostFeed posts={filteredDocs} />
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
