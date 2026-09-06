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

  const isDark =
    theme === THEMES.DARK ||
    (theme === THEMES.SYSTEM &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  html.classList.toggle("dark", isDark);
}

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const updateTheme = () => {
      const storedTheme = localStorage.getItem(THEME_KEY);

      const theme =
        storedTheme === THEMES.DARK || storedTheme === THEMES.LIGHT
          ? storedTheme
          : THEMES.SYSTEM;

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

  return <>{children}</>;
}
