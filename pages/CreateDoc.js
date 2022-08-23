import React, { useState } from "react";

import dynamic from "next/dynamic";
import TextEditor from "../components/TextEditor";
const CreateDoc = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

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
            <p>{content}</p>
          </div>
        </label>
        <button type="button" className="btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateDoc;
