import React, { useState } from "react";
import { RiEarthFill } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";
import { BsCircle, BsFillCheckCircleFill } from "react-icons/bs";
import TextEditor from "../components/TextEditor";

// firebase
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase-config";
import { useAuthContext } from "../hooks/useAuthContext";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
const CreateDoc = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [publicPost, setPublicPost] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);
    // firebase query
    // const docRef = doc(db, "users", `${user.uid}`, "posts");
    const colRef = collection(db, "users", `${user.uid}`, "posts");
    await addDoc(colRef, {
      title: title,
      summary: summary,
      content: content,
      username: user.displayName,
      slug: "",
      published: publicPost,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
      .then(async (docRef) => {
        // console.log(docRef.id);
        await updateDoc(docRef, {
          slug: docRef.id,
        });
        router.push("/");
      })

      .catch((error) => {
        console.log(error);
      });
    setIsLoading(false);
  };

  // const handleSubmit = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     where("username", "==", username.toLowerCase()),
  //     limit(1)
  //   );
  //   const snapShot = await getDocs(q);
  //   const userData = snapShot.docs[0];
  //   //
  //   const postQuery = query(
  //     collection(db, `users/${userData.id}/posts`),
  //     where("slug", "==", slug),
  //     limit(1)
  //   );
  // };

  return (
    <div className="container margin-top-xl">
      <div className="form mx-width-large">
        <h2>Create a doc</h2>
        <label>
          <span>Title:</span>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>Short description:</span>
          <textarea
            type="text"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            style={{
              height: "8rem",
              width: "100%",
              backgroundColor: "var(--background-color)",
              fontSize: "1.7rem",
              fontFamily: "Inter, sans-serif",
            }}
          />
        </label>
        <label>
          <span>Content:</span>
          <div>
            <TextEditor setContent={setContent} />
          </div>
        </label>

        <div className="public-toggle">
          <div onClick={() => setPublicPost(true)} className="toggle-svg">
            {publicPost ? <BsFillCheckCircleFill /> : <BsCircle />}
            <RiEarthFill /> Public
          </div>
          <div onClick={() => setPublicPost(false)} className="toggle-svg">
            <div className="toggle-item">
              {publicPost ? <BsCircle /> : <BsFillCheckCircleFill />}
              <AiFillLock /> Only me
            </div>
          </div>
        </div>

        {isLoading && (
          <button className="btn margin-top-sm center-items" disabled>
            Loading <Loader />
          </button>
        )}
        {!isLoading && (
          <button
            type="button"
            className="btn margin-top-sm"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateDoc;
