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
        {user?.photoUrl ? (
          <Image
            src={user?.photoUrl}
            width={30}
            height={30}
            alt="profile avatar"
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            className={styles.profile}
            width="40"
            height="40"
            alt="user-profile"
          />
          // <BsFillPersonFill className={styles.profile} />
        )}
      </div>

      {open && (
        <div className={styles["dropdown-container"]}>
          <div className={styles.dropdown}>
            {/* edit this */}
            <Link href={`/${username}`}>
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
