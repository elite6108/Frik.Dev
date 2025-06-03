import { useState, useEffect } from "react";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.theme = newTheme ? "dark" : "light";
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition hover:scale-105 hover:shadow cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? (
        <MdSunny size={16}/>
      ) : (
        <FaMoon size={16}/>
      )}
    </button>
  );
}