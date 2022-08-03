import React from "react";
import styles from "./DocumentCard.module.scss";
const DocumentCard = () => {
  return (
    <div className={styles.container}>
      <h3>This is a Title</h3>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        dignissimos magnam ut quaerat optio eos dicta? Beatae cum commodi
      </p>
      <div className={styles.footer}>
        <span>Author: Kenneth Vega</span>
        <span>January 19 2022</span>
      </div>
    </div>
  );
};

export default DocumentCard;
