"use client";

import { useTheme } from "next-themes";

const ThemeButton = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
    >
      Theme <span className="capitalize">({theme})</span>
    </button>
  );
};

export default ThemeButton;
