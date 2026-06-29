"use client";

import { motion } from "motion/react";
import Breadcrumb from "../ui/Breadcrumb";

export default function CategoryHeader({ category }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="from-dark via-dark/95 to-dark text-light relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b px-8 py-20"
    >
      {/* Glow effects */}
      <div className="bg-primary/20 absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
      <div className="bg-primary/10 absolute right-10 -bottom-24 h-72 w-72 rounded-full blur-3xl" />

      {/* Decorative lines */}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          دوره‌های <span className="text-primary">{category.name}</span>
        </h1>

        <p className="text-light/60 mt-4 max-w-md text-sm">
          مجموعه‌ای از بهترین دوره‌های تخصصی در این دسته‌بندی
        </p>

        <div className="mt-8">
          <Breadcrumb
            title1="دسته‌بندی‌ها"
            link1="/courses"
            title2={category.name}
            link2={`/courses/${category.slug}`}
          />
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="bg-primary/60 absolute bottom-0 left-1/2 h-1 w-40 -translate-x-1/2 rounded-full blur-sm" />
    </motion.div>
  );
}
