"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";

import ContentRenderer from "@/components/modules/ui/content/ContentRenderer";

export default function CategoryDesc({ category }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.section
      layout
      transition={{ duration: 0.35 }}
      className="bg-light dark:bg-dark border-dark/10 dark:border-light/10 relative overflow-hidden rounded-3xl border"
    >
      {/* Header */}
      <div className="border-dark/10 dark:border-light/10 border-b px-8 py-6">
        <h3 className="text-dark dark:text-light text-center text-xl font-bold">
          توضیحات دسته‌بندی
        </h3>
      </div>

      {/* Content */}
      <motion.div
        animate={{
          height: isExpanded ? "auto" : 240,
        }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden"
      >
        <div className="px-8 py-6">
          {category.content?.length ? (
            <ContentRenderer content={category.content} />
          ) : (
            <p className="text-dark/80 dark:text-light/80 text-sm leading-9">
              توضیحات این دسته‌بندی هنوز اضافه نشده است.
            </p>
          )}
        </div>

        <AnimatePresence>
          {!isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="from-light dark:from-dark absolute inset-x-0 bottom-0 h-28 bg-linear-to-t to-transparent"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Button */}
      <div className="flex justify-center px-6 pb-6">
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className="bg-primary text-light group shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <span>{isExpanded ? "نمایش کمتر" : "نمایش بیشتر"}</span>

          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <LuChevronDown size={18} />
          </motion.span>
        </button>
      </div>
    </motion.section>
  );
}
