"use client";

import { useEffect } from "react";

const THEME_KEY = "theme";
export const THEMES = {
  DARK: "dark",
  LIGHT: "light",
  SYSTEM: "system",
};

function applyTheme(theme) {
  const html = document.documentElement;

  if (theme === THEMES.DARK) {
    html.classList.add("dark");
  } else if (theme === THEMES.LIGHT) {
    html.classList.remove("dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.classList.add("dark");
  } else {
    html.classList.remove("dark");
  }
}

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem(THEME_KEY) || THEMES.SYSTEM;
      applyTheme(theme);
    };

    updateTheme();

    window.addEventListener("storage", updateTheme);
    window.addEventListener("theme-change", updateTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", updateTheme);

    return () => {
      window.removeEventListener("storage", updateTheme);
      window.removeEventListener("theme-change", updateTheme);
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return children;
}