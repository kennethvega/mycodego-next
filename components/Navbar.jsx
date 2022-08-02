import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <div className={styles["nav-container"]}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">DeveloperDocs</Link>
        </div>
        <div>
          <ul className={styles.list}>
            <li>
              <Link href="/signup">Sign up</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <Theme />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
