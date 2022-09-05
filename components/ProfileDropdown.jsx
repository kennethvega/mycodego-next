import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { AiFillDownCircle } from "react-icons/ai";
import styles from "./ProfileDropdown.module.scss";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import Image from "next/image";
const ProfileDropdown = () => {
  const { logout } = useLogout();
  const { user, username } = useAuthContext();

  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={styles["profile-container"]}
        onClick={() => setOpen(!open)}
      >
        <AiFillDownCircle className={styles["down-circle-svg"]} />

        <Image
          // replace this with photoUrl
          src={user.photoURL ? user.photoURL : "/blank-profile.png"}
          width={40}
          height={40}
          alt="profile avatar"
          className={styles.profile}
        />
      </div>

      {open && (
        <div className={styles["dropdown-container"]}>
          <div className={styles.dropdown}>
            {/* edit this */}
            <Link href={`/${user.uid}`}>
              <div
                className={styles["dropdown-item"]}
                onClick={() => setOpen(!open)}
              >
                <BsFillPersonFill /> <span>Profile</span>
              </div>
            </Link>

            <div className={styles["dropdown-item"]} onClick={logout}>
              <IoMdLogOut /> <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
