import React, { useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import ReactDOM from "react-dom";
const Modal = ({ openModal, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };
  const modalContent = openModal ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p onClick={handleClose}>x</p>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

export default Modal;
