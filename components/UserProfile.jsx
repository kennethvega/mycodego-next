import React, { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "./UserProfile.module.scss";
import Image from "next/image";

import Modal from "./Modal";
import { checkUserWithUsername, db, storage } from "../lib/firebase-config";
import Loader from "./Loader";
import { updateProfile } from "firebase/auth";
import {
  collectionGroup,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
const UserProfile = ({ userDetail, posts }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  // user input state
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
  const defaultImage = "/blank-profile.png";
  const postedLength = posts.length;
  const userName = username;
  useEffect(() => {
    setUsername(userDetail.username);
    setBio(userDetail.bio);
    setFullName(userDetail.fullName);
  }, [userDetail]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetail.username === username) {
      try {
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
        // update both profile and users document
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
        // update user posts username
        const postsData = await getDocs(
          query(collectionGroup(db, "posts"), where("id", "==", userDetail?.id))
        );
        const userPosts = postsData.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        await Promise.all(
          userPosts.map((post) =>
            updateDoc(doc(db, "users", `${user.uid}/posts/${post.slug}`), {
              username: username,
              photoURL: user.photoURL,
            })
          )
        );
        // refresh userDetailData without refreshing the whole page
        // router.replace(router.asPath);
        await router.push(`/${username}`);
        setLoading(false);
        toast.success("Profile updated");
        setOpenModal(false);
        setError("");
      } catch (err) {
        console.log(err);
      }
    } else {
      const userNameTaken = await checkUserWithUsername(userName);
      if (!userNameTaken) {
        try {
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
          // update both profile and users document
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
          // update user posts username
          const postsData = await getDocs(
            query(
              collectionGroup(db, "posts"),
              where("id", "==", userDetail?.id)
            )
          );
          const userPosts = postsData.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          await Promise.all(
            userPosts.map((post) =>
              updateDoc(doc(db, "users", `${user.uid}/posts/${post.slug}`), {
                username: username,
                photoURL: user.photoURL,
              })
            )
          );
          // refresh userDetailData without refreshing the whole page
          // router.replace(router.asPath);
          await router.push(`/${username}`);
          toast.success("Profile updated");
          setLoading(false);
          setOpenModal(false);
          setError("");
        } catch (err) {
          console.log(err);
        }
      } else {
        setError("username is already taken. please try another");
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div className={styles["profile-info"]}>
        <div className={styles["profile-image"]}>
          <Image
            src={userDetail.photoURL ? userDetail.photoURL : defaultImage}
            width={150}
            height={150}
            alt="user-profile"
            className={styles["user-profile"]}
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
                    onChange={(e) =>
                      setUsername(
                        e.target.value.replace(/\s+/g, "_").toLocaleLowerCase()
                      )
                    }
                    value={username}
                    disabled={loading ? true : false}
                  />
                </label>
                <label>
                  <span>Full name:</span>
                  <input
                    type="text"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    disabled={loading ? true : false}
                  />
                </label>
                <label>
                  <span>Bio:</span>
                  <input
                    type="text"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    disabled={loading ? true : false}
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
                    accept="image/*"
                    className={styles["image-input-file"]}
                    onChange={addProfilePicture}
                    disabled={loading ? true : false}
                  />
                </label>
                <p className="error">{error}</p>
                <div className="center-items margin-top-sm">
                  {loading ? (
                    <button className="btn center-items" disabled>
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
          <p className={styles.fullname}>{userDetail?.fullName}</p>
          <p className={styles.bio}>{userDetail?.bio}</p>
        </div>
      </div>

      <div className={styles["documents-container"]}>
        <h3 className={styles["post-title"]}>
          Posted Documents {postedLength}
        </h3>
      </div>
    </div>
  );
};

export default UserProfile;
