"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CoursesDropdown from "./CoursesDropdown";
import { LuChevronDown } from "react-icons/lu";

export default function NavItems() {
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  return (
    <ul className="hidden items-center gap-6 text-sm md:flex">
      {/* Courses */}
      <li
        className="relative"
        onMouseEnter={() => setIsCoursesOpen(true)}
        onMouseLeave={() => setIsCoursesOpen(false)}
        onClick={() => setIsCoursesOpen(!isCoursesOpen)}
      >
        <button className="hover:text-primary flex cursor-pointer items-center gap-1 transition-colors">
          <span>دوره‌های آموزشی</span>

          <motion.div
            animate={{ rotate: isCoursesOpen ? 45 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <LuChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isCoursesOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 z-50 pt-3"
            >
              <div className="bg-white dark:bg-dark min-w-64 rounded-2xl border border-white/10 p-2 shadow-md backdrop-blur-xl">
                <CoursesDropdown />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </li>

      <li>
        <Link href="/" className="hover:text-primary transition-colors">
          مقالات
        </Link>
      </li>

      <li>
        <Link href="/about" className="hover:text-primary transition-colors">
          درباره ما
        </Link>
      </li>
    </ul>
  );
}
