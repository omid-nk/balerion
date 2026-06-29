"use client";

import React from "react";
import { LuMoonStar, LuMonitor, LuSun } from "react-icons/lu";
import { THEMES } from "@/providers/ThemeProvider";

const subscribeToTheme = (callback) => {
  window.addEventListener("theme-change", callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener("theme-change", callback);
    window.removeEventListener("storage", callback);
  };
};

const getThemeSnapshot = () => localStorage.getItem("theme") || THEMES.SYSTEM;

const getServerThemeSnapshot = () => THEMES.SYSTEM;

export default function ThemeSwitcher() {
  const theme = React.useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const setTheme = (nextTheme) => {
    if (nextTheme === THEMES.SYSTEM) {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", nextTheme);
    }

    window.dispatchEvent(new Event("theme-change"));
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
      <p className="mb-3 text-sm font-medium">ظاهر سایت</p>

      <div className="flex gap-2">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.value}
              onClick={() => setTheme(item.value)}
              className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5   text-sm transition ${
                theme === item.value
                  ? "bg-primary  text-white"
                  : " bg-light/5 hover:bg-light/10"
              } `}
            >
              <Icon className="" />
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
