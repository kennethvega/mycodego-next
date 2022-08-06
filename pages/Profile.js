import React, { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "../styles/Profile.module.scss";
import Image from "next/image";
const Profile = () => {
  const { user } = useAuthContext();
  const router = useRouter();

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
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            width={200}
            height={200}
            alt="user-profile"
          />
        </div>
        <div className={styles.info}>
          <h2 className={styles.name}>John Doe</h2>
          <button className="btn btn-sm">Edit profile</button>
          <p>Documents: 4</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
