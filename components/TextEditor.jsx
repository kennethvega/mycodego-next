import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Quill from "quill";


import "quill/dist/quill.snow.css";

function TextEditor() {
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow" });
  }, []);

  return <div id="container" ref={wrapperRef}></div>;
}

export default TextEditor;
