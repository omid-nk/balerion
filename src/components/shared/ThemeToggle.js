"use client";

import React from "react";
import { LuMoonStar, LuMonitor, LuSun } from "react-icons/lu";

import { THEMES } from "@/providers/ThemeProvider";

const THEME_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

const subscribeToTheme = (callback) => {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
};

const getThemeSnapshot = () => {
  const theme = localStorage.getItem(THEME_KEY);

  if (theme === THEMES.DARK) return THEMES.DARK;
  if (theme === THEMES.LIGHT) return THEMES.LIGHT;

  return THEMES.SYSTEM;
};

const getServerThemeSnapshot = () => THEMES.SYSTEM;

export default function ThemeSwitcher() {
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const setTheme = (nextTheme) => {
    if (nextTheme === THEMES.SYSTEM) {
      localStorage.removeItem(THEME_KEY);
    } else {
      localStorage.setItem(THEME_KEY, nextTheme);
    }

    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  const items = [
    {
      icon: LuSun,
      value: THEMES.LIGHT,
      label: "روشن",
    },
    {
      icon: LuMonitor,
      value: THEMES.SYSTEM,
      label: "سیستم",
    },
    {
      icon: LuMoonStar,
      value: THEMES.DARK,
      label: "تاریک",
    },
  ];

  return (
    <div>
      <p className="mt-6 mb-3 text-base">ظاهر سایت</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setTheme(item.value)}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm transition ${
                theme === item.value
                  ? "bg-primary text-white"
                  : "bg-light/5 hover:bg-light/10"
              }`}
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
