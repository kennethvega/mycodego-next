import React from "react";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Theme from "./Theme";
import { useAuthContext } from "../hooks/useAuthContext";
import { GoPlus } from "react-icons/go";
import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
  const { user } = useAuthContext();

  return (
    <div className={styles["nav-container"]}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logo}>
            <a>MYCODEGO</a>
          </div>
        </Link>

        {!user && (
          <div className={styles.list}>
            <Link href="/Login">
              <p className="btn btn-sm">Login</p>
            </Link>
            <Link href="/Signup">
              <p className={styles["signup-btn"]}>Sign up</p>
            </Link>
            <Theme />
          </div>
        )}
        {user && (
          <div className={styles.list}>
            <Link href="/CreateDoc">
              <div className={styles["add-container"]}>
                <GoPlus className={styles.add} title="Create a document" />
              </div>
            </Link>

            <Theme />
            <ProfileDropdown />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
