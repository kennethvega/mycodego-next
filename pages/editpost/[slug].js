import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { BsCircle, BsFillCheckCircleFill } from "react-icons/bs";
import { RiEarthFill } from "react-icons/ri";
import Loader from "../../components/Loader";
import TextEditor from "../../components/TextEditor";
import { useAuthContext } from "../../hooks/useAuthContext";
import { db, getPost, postToJSON } from "../../lib/firebase-config";
import { toast } from "react-toastify";
const EditPostContent = ({ post }) => {
  const [title, setTitle] = useState(post?.title);
  const [summary, setSummary] = useState(post?.summary);
  const [tiptapContent, setTiptapContent] = useState(post?.content);
  const [isLoading, setIsLoading] = useState(false);
  const [publicPost, setPublicPost] = useState(true);
  const { user } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // firebase query
    const colRef = doc(db, "users", `${user.uid}`, "posts", `${post.slug}`);
    await updateDoc(colRef, {
      title: title,
      summary: summary,
      content: tiptapContent,
      published: publicPost,
      updatedAt: serverTimestamp(),
    }).catch((error) => {
      console.log(error);
    });
    await router.push(`/${post.username}/${post.slug}`);

    setIsLoading(false);
    toast.success("Successfully edited post.");
  };
  return (
    <div className="container margin-top-xl">
      <form className="form mx-width-large" onSubmit={handleSubmit}>
        <h2>Update document</h2>
        <label>
          <span>Title:</span>
          <input
            type="text"
            required={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="65"
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
            maxLength="230"
          />
        </label>
        <label>
          <span>Content:</span>
          <div>
            <TextEditor
              setTiptapContent={setTiptapContent}
              tiptapContent={tiptapContent}
            />
          </div>
        </label>
        {console.log(tiptapContent)}
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
            Updating <Loader />
          </button>
        )}
        {!isLoading && <button className="btn margin-top-sm">Update</button>}
      </form>
    </div>
  );
};

export default EditPostContent;
export async function getServerSideProps({ query }) {
  const { slug } = query;
  let post;
  const postDetails = await getPost(slug);
  const postItem = postDetails.docs.map(postToJSON);
  post = postItem[0];

  return {
    props: { post },
  };
}
