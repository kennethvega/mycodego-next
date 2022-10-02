import React, { useState } from "react";
import { RiEarthFill } from "react-icons/ri";
import { AiFillLock } from "react-icons/ai";
import { BsCircle, BsFillCheckCircleFill } from "react-icons/bs";
import TextEditor from "../components/TextEditor";
import { toast } from "react-toastify";
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
  const [tiptapContent, setTiptapContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [publicPost, setPublicPost] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // firebase query
    const colRef = collection(db, "users", `${user.uid}`, "posts");
    await addDoc(colRef, {
      title: title,
      summary: summary,
      content: tiptapContent,
      username: user.displayName,
      slug: "",
      published: publicPost,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      id: user.uid,
      photoURL: user.photoURL,
      hearts: [],
      comments: [],
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
    toast.success("Successfully created post.");
  };

  return (
    <div className="container margin-top-xl">
      <form className="form mx-width-large" onSubmit={handleSubmit}>
        <h2>Create a doc</h2>
        <label>
          <span>Title:</span>
          <input
            type="text"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="80"
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
            maxLength="240"
          />
        </label>
        <label>
          <span>Content:</span>
          <div>
            <TextEditor setTiptapContent={setTiptapContent} />
          </div>
        </label>

        <div className="public-toggle">
          <div onClick={() => setPublicPost(true)} className="toggle-svg">
            {publicPost ? (
              <BsFillCheckCircleFill className="circle-check" />
            ) : (
              <BsCircle />
            )}
            <RiEarthFill /> Public
          </div>
          <div onClick={() => setPublicPost(false)} className="toggle-svg">
            <div className="toggle-item">
              {publicPost ? (
                <BsCircle />
              ) : (
                <BsFillCheckCircleFill className="circle-check" />
              )}
              <AiFillLock /> Only me
            </div>
          </div>
        </div>

        {isLoading && (
          <button className="btn margin-top-sm center-items" disabled>
            Loading <Loader />
          </button>
        )}
        {!isLoading && <button className="btn margin-top-sm">Submit</button>}
      </form>
    </div>
  );
};

export default CreateDoc;
