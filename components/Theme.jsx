import React, { forwardRef } from "react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styles from "./Theme.module.scss";

const Theme = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else setTheme("light");
  };

  return (
    <div className={styles["toggle-icon-container"]} onClick={toggleTheme}>
      {theme === "light" ? (
        <BsFillMoonFill className={styles["toggle-icon"]} />
      ) : (
        <BsFillSunFill className={styles["toggle-icon"]} />
      )}
    </div>
  );
};

export default Theme;
