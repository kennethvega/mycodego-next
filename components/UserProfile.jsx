import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/router";
import styles from "./UserProfile.module.scss";
import Image from "next/image";
import CapitalizeStringName from "../helpers/capitalizeStringName";
const UserProfile = ({ userDetail }) => {
  const { user } = useAuthContext();
  const router = useRouter();

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
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            width={150}
            height={150}
            alt="user-profile"
          />
        </div>
        <div className={styles.info}>
          <div className={styles["top-container"]}>
            <h2 className={styles.name}>{name}</h2>

            <button className="btn btn-sm">Edit profile</button>
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
