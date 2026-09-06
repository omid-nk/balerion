"use client";

import { useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { LuChevronDown } from "react-icons/lu";

import ContentRenderer from "./ContentRenderer";

export default function ExpandableText({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content) {
    return (
      <section className="bg-light dark:bg-dark border-border relative overflow-hidden rounded-lg border">
        <div className="border-dark/10 dark:border-light/10 border-b px-4 py-4 sm:px-8 sm:py-6">
          <h3 className="text-dark dark:text-light text-center text-base font-bold sm:text-xl">
            توضیحات
          </h3>
        </div>

        <div className="px-4 py-5 sm:px-8 sm:py-6">
          <p className="text-dark/50 dark:text-light/50 text-xs sm:text-sm">
            محتوایی برای نمایش وجود ندارد.
          </p>
        </div>
      </section>
    );
  }

  const isJsonContent = typeof content === "object";

  return (
    <motion.section
      layout
      transition={{
        layout: {
          duration: 0.4,
          ease: "easeInOut",
        },
      }}
      className="bg-light dark:bg-dark border-border relative overflow-hidden rounded-lg border"
    >
      {/* Header */}
      <div className="border-border border-b px-4 py-4 sm:px-8 sm:py-6">
        <h3 className="text-dark dark:text-light text-center text-base font-bold sm:text-xl">
          توضیحات
        </h3>
      </div>

      {/* Content */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 240,
        }}
        transition={{
          height: {
            duration: 0.4,
            ease: "easeInOut",
          },
        }}
        className="relative overflow-hidden"
      >
        <div className="px-4 py-5 sm:px-8 sm:py-6">
          {isJsonContent ? (
            <ContentRenderer content={content} />
          ) : (
            <p className="text-dark/80 dark:text-light/80 text-xs leading-8 sm:text-sm sm:leading-9">
              {content}
            </p>
          )}
        </div>

        {/* Fade */}
        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="from-light dark:from-dark pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t to-transparent sm:h-28"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Button */}
      <div className="flex justify-center px-4 pb-5 sm:px-6 sm:pb-6">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="bg-primary text-light shadow-primary/20 hover:shadow-primary/30 flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-2 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-sm"
        >
          <span>{isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}</span>

          <motion.span
            animate={{
              rotate: isExpanded ? 180 : 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          >
            <LuChevronDown className="size-4 sm:size-4.5" />
          </motion.span>
        </button>
      </div>
    </motion.section>
  );
}
