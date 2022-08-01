import React from "react";
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
    <div className="container">
      <div className={styles["toggle-icon-container"]}>
        {theme === "light" ? (
          <BsFillMoonFill
            className={styles["toggle-icon"]}
            onClick={toggleTheme}
          />
        ) : (
          <BsFillSunFill
            className={styles["toggle-icon"]}
            onClick={toggleTheme}
          />
        )}
      </div>
    </div>
  );
};

export default Theme;
