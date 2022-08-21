import {
  collectionGroup,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import {
  db,
  getUserDocWithUsername,
  getUserPost,
  postToJSON,
} from "../../lib/firebase-config";

const Post = ({ post }) => {
  // const p = post[0];
  return (
    <div className="container margin-top-xl">
      <p>asdasd</p>
      <h1>{post.title}</h1>
      {console.log(post)}
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const postQuery = query(
    collectionGroup(db, "posts"),
    where("published", "==", true)
  );
  const querySnapshot = await getDocs(postQuery);
  const paths = querySnapshot.docs.map((doc) => {
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

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserDocWithUsername(username);
  let post;
  // let path;

  if (userDoc) {
    const postItem = await getUserPost(username, slug);
    post = postItem.docs.map(postToJSON)[0];
  }
  return {
    props: { post },
    revalidate: 5000,
  };
}
