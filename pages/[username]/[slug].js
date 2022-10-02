import {
  query,
  collectionGroup,
  where,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";
import PostContent from "../../components/PostContent";
import {
  db,
  getUserDocWithUsername,
  postToJSON,
} from "../../lib/firebase-config";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserDocWithUsername(username);
  let post = null;

  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  if (userDoc) {
    const postRef = query(
      collection(db, `users/${userDoc.id}/posts`),
      where("slug", "==", slug)
    );
    const postDetails = await getDocs(postRef);
    const postItem = postDetails.docs.map(postToJSON);
    post = postItem[0];
  }

  return {
    props: { post },
  };
}
export async function getStaticPaths() {
  const itemRef = query(collectionGroup(db, "posts"));
  const snapshot = await getDocs(itemRef);
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
const Post = ({ post }) => {
  return (
    <main className="container margin-top-xl">
      <PostContent post={post} />
    </main>
  );
};

export default Post;
