import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import styles from "./ProfileDropdown.module.scss";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";

const ProfileDropdown = () => {
  const { logout } = useLogout();

  const [open, setOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div
        className={styles["profile-container"]}
        onClick={() => setOpen(!open)}
      >
        <BsFillPersonFill className={styles.profile} />
      </div>

      {open && (
        <div className={styles["dropdown-container"]}>
          <div className={styles.dropdown}>
            <Link href="/Profile">
              <div className={styles["dropdown-item"]}>
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
