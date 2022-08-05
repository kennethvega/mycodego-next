import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Theme from "./Theme";
import { useAuthContext } from "../hooks/useAuthContext";

import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className={styles["nav-container"]}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">DeveloperDocs</Link>
        </div>
        {!user && (
          <div className={styles.list}>
            <Link href="/Login">
              <p className="btn btn-sm">Login</p>
            </Link>
            <Theme />
          </div>
        )}
        {user && (
          <div className={styles.list}>
            <Theme />
            <ProfileDropdown />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
