"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { LuChevronDown } from "react-icons/lu";

export default function HeaderDesktopNav({ items }) {
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const categoryItems = items.filter((item) => !item.mobileOnly);

  return (
    <nav className="flex items-center gap-8">
      <ul className="hidden gap-5 *:cursor-pointer md:flex">
        {/* Categories */}
        <li
          className="relative flex items-center gap-1"
          onMouseEnter={() => setCategoriesOpen(true)}
          onMouseLeave={() => setCategoriesOpen(false)}
        >
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1"
          >
            دسته‌بندی‌ها
            <LuChevronDown
              className={`transition-transform ${
                categoriesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {categoriesOpen && (
              <motion.section
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="absolute top-full right-0 z-50 w-64 pt-4"
              >
                <div className="bg-light dark:bg-dark border-border flex w-full flex-col gap-1 rounded-xl border p-2 shadow-lg">
                  {categoryItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        href={item.href}
                        key={item.id}
                        className="hover:bg-primary/10 hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
                      >
                        <Icon className="size-5 shrink-0" />

                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </li>

        {/* Articles */}
        <li>
          <Link className="hover:text-primary" href="/mags">
            مقالات
          </Link>
        </li>

        {/* About */}
        <li>
          <Link className="hover:text-primary" href="/about-us">
            درباره‌ما
          </Link>
        </li>
      </ul>
    </nav>
  );
}
