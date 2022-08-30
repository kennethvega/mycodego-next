import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "./UserProfile.module.scss";
import Image from "next/image";
import CapitalizeStringName from "../helpers/capitalizeStringName";
import Modal from "./Modal";
const UserProfile = ({ userDetail }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const name = CapitalizeStringName(userDetail);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      return;
    }
  });

  return (
    <div className="container">
      <div className={styles["profile-info"]}>
        <div className={styles["profile-image"]}>
          <Image
            src="/blank-profile.png"
            width={150}
            height={150}
            alt="user-profile"
          />
        </div>
        <div className={styles.info}>
          <div className={styles["top-container"]}>
            <h2 className={styles.name}>{name}</h2>

            <button className="btn btn-sm" onClick={() => setOpenModal(true)}>
              Edit profile
            </button>
            <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
              <h3 className={styles["modal-title"]}>Update Profile</h3>
              <form className="form">
                <label>
                  <span>Username:</span>
                  <input
                    type="text"

                    // onChange={(e) => setEmail(e.target.value)}
                    // value={email}
                  />
                </label>

                <label>
                  <span>Full name:</span>
                  <input
                    type="text"

                    // onChange={(e) => setEmail(e.target.value)}
                    // value={email}
                  />
                </label>
                <label>
                  <span>Bio:</span>
                  <input
                    type="text"

                    // onChange={(e) => setEmail(e.target.value)}
                    // value={email}
                  />
                </label>
                <div className={styles.picture}>
                  <p>Upload profile picture</p>
                </div>
                <div className="center-items margin-top-sm">
                  <button className="btn">Update profile</button>
                </div>
              </form>
            </Modal>
          </div>
          <p>{userDetail?.bio}</p>
          <p>10 documents</p>
        </div>
      </div>

      <div className={styles["documents-container"]}>
        <h3 className={styles["post-title"]}>Posted Docs</h3>
      </div>
    </div>
  );
};

export default UserProfile;

// to dos
// 1. learn firebase storage for image upload
// 2. and reference it to users collection firestore
// 3. create a modal form
// 4. fetch user info for initial state
// 5. update user info
