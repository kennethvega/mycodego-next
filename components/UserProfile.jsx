import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "./UserProfile.module.scss";
import Image from "next/image";

import Modal from "./Modal";
import { upload } from "../lib/firebase-config";
import Loader from "./Loader";

const UserProfile = ({ userDetail }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  // user input state
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setUsername(userDetail.username);
    if (userDetail.photoURL) {
      setPhoto(userDetail.photoURL);
    }
  }, [userDetail]);

  const handlePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    await upload(photo, userDetail);
    // then update profile picture and displayName of auth user then
    // update users in firestore 1.username = displayName 2.bio 3.photoURL 4.fullname
    //
    setLoading(false);
  };

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
            src={
              userDetail.photoURL ? userDetail.photoURL : "/blank-profile.png"
            }
            width={150}
            height={150}
            alt="user-profile"
          />
        </div>
        <div className={styles.info}>
          <div className={styles["top-container"]}>
            <h2 className={styles.name}>{userDetail.username}</h2>
            {user.email === userDetail.emailAddress && (
              <button className="btn btn-sm" onClick={() => setOpenModal(true)}>
                Edit profile
              </button>
            )}

            <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
              <h3 className={styles["modal-title"]}>Update Profile</h3>
              <form className="form" onSubmit={handleSubmit}>
                <label>
                  <span>Username:</span>
                  <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </label>
                <label>
                  <span>Full name:</span>
                  <input
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                  />
                </label>
                <label>
                  <span>Bio:</span>
                  <input
                    type="text"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                  />
                </label>
                <label className={styles.picture} htmlFor="upload">
                  <Image
                    src={
                      userDetail.photoURL
                        ? userDetail.photoURL
                        : "/blank-profile.png"
                    }
                    width={150}
                    height={150}
                    alt="user-profile"
                    className={styles.image}
                  />
                  <p>Upload a photo</p>
                  <input
                    id="upload"
                    type="file"
                    className={styles["image-input-file"]}
                    onChange={handlePhoto}
                  />
                </label>
                <div className="center-items margin-top-sm">
                  {loading ? (
                    <button className="btn margin-top-sm center-items" disabled>
                      Loading <Loader />
                    </button>
                  ) : (
                    <button className="btn">Update profile</button>
                  )}
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
