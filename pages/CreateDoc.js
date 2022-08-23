import React, { useState } from "react";
import TextEditor from "../components/TextEditor";
import dynamic from "next/dynamic";



const CreateDoc = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const addDesc = (value) => {
    setContent(value);
  };

  return (
    <div className="container margin-top-xl">
      <form className="form mx-width-large">
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
          <div className="text-editor">
            <TextEditor />
          </div>
        </label>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default CreateDoc;
