"use client";
import { useState } from "react";

export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <input
      type="checkbox"
      id="themeSwitch"
      defaultChecked={true}
      onClick={() => {
        setDarkMode(!darkMode);
        if (darkMode) {
          window.document.documentElement.classList.add("light");
          window.document.documentElement.classList.remove("dark");
        } else {
          window.document.documentElement.classList.add("dark");
          window.document.documentElement.classList.remove("light");
        }
      }}
    />
  );
}
