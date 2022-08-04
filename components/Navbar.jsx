import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Theme from "./Theme";
import { useAuthContext } from "../hooks/useAuthContext";

import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles["nav-container"]}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">DeveloperDocs</Link>
        </div>
        <div>
          <ul className={styles.list}>
            {!user && (
              <li>
                <Link href="/Login">Login</Link>
              </li>
            )}

            <Theme />
            {user && <ProfileDropdown />}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
