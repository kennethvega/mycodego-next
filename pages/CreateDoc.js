import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateDoc = () => {
  return (
    <div className="container margin-top-xl">
      <div className="form mx-width-large">
        <h2>Create a doc</h2>
        <label>
          <span>Title:</span>
          <input type="email" required />
        </label>
        <label>
          <span>Short description:</span>
          <textarea
            type="email"
            required
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
            <ReactQuill />
          </div>
        </label>
      </div>
    </div>
  );
};

export default CreateDoc;
