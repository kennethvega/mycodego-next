import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
export default function Home() {
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
    <div className="background">
      <p>The current theme is {theme}</p>
      <p className="text">hello world asdasdasd</p>
      <button onClick={toggleTheme}>toggle dark/light mode</button>
    </div>
  );
}
