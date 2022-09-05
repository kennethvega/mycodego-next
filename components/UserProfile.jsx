import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "./UserProfile.module.scss";
import Image from "next/image";

import Modal from "./Modal";
import { db, storage, upload } from "../lib/firebase-config";
import Loader from "./Loader";
import { updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const UserProfile = ({ userDetail }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  // user input state
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const defaultImage = "/blank-profile.png";

  useEffect(() => {
    setUsername(userDetail.username);
    setBio(userDetail.bio);
    setFullName(userDetail.fullName);
  }, [userDetail]);
  console.log(userDetail.photoURLy);
  const addProfilePicture = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setPreview(readerEvent.target.result);
    };
  };
  console.log(profilePicture);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let imageURL;
      const userRef = doc(db, "users", user.uid);
      const fileRef = ref(storage, userDetail.id);
      if (profilePicture) {
        await uploadBytes(fileRef, profilePicture);
        imageURL = await getDownloadURL(fileRef);
      } else {
        imageURL = userDetail?.photoURL;
      }

      await updateProfile(user, {
        photoURL: imageURL,
        displayName: username,
      }).then(
        await updateDoc(userRef, {
          photoURL: imageURL,
          username: username,
          bio: bio,
          fullName: fullName,
        })
      );
      setLoading(false);
      setOpenModal(false);
      router.reload();
    } catch (err) {
      console.log(err);
    }
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
            src={userDetail.photoURL ? userDetail.photoURL : defaultImage}
            width={150}
            height={150}
            alt="user-profile"
          />
        </div>
        <div className={styles.info}>
          <div className={styles["top-container"]}>
            <h2 className={styles.name}>{userDetail.username}</h2>
            {user?.email === userDetail.emailAddress && (
              <button className="btn btn-sm" onClick={() => setOpenModal(true)}>
                Edit profile
              </button>
            )}

            <Modal openModal={openModal} onClose={() => setOpenModal(false)}>
              <h3 className={styles["modal-title"]}>Update Profile</h3>
              <form className="form">
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
                <label className={styles.picture}>
                  <Image
                    src={
                      preview || userDetail.photoURL
                        ? preview || userDetail.photoURL
                        : defaultImage
                    }
                    width={150}
                    height={150}
                    alt="user-profile"
                    className={styles.image}
                    onClick={(e) => {
                      e.preventDefault();
                      fileInputRef.current.click();
                    }}
                  />
                  <p>Upload a photo</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    // accept="image/*"
                    className={styles["image-input-file"]}
                    onChange={addProfilePicture}
                  />
                </label>
                <div className="center-items margin-top-sm">
                  {loading ? (
                    <button className="btn margin-top-sm center-items" disabled>
                      Loading <Loader />
                    </button>
                  ) : (
                    <button className="btn" onClick={handleSubmit}>
                      Update profile
                    </button>
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
