import { query, collectionGroup, where, getDocs } from "firebase/firestore";
import React from "react";
import {
  db,
  getUserDocWithId,
  getUserPost,
  postToJSON,
} from "../../lib/firebase-config";

const Post = ({ post, path }) => {
  return <div className="container margin-top-xl"></div>;
};

export default Post;

export async function getStaticProps({ params }) {
  const { id, slug } = params;
  const userDoc = await getUserDocWithId(id);
  let post;
  let path;
  if (!userDoc) {
    return {
      notFound: true,
    };
  }
  if (userDoc) {
    const postQuery = await getUserPost(id, slug);
    post = postQuery.docs.map(postToJSON);
    path = post;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}
export async function getStaticPaths() {
  const itemRef = query(collectionGroup(db, "posts"));
  const snapshot = await getDocs(itemRef);

  const paths = snapshot.docs.map((doc) => {
    const { id, slug } = doc.data();
    return {
      params: { id, slug },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
}
