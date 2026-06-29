"use client";

import { motion } from "motion/react";
import Breadcrumb from "@/components/modules/ui/Breadcrumb";
import CoursesSearch from "./components/CoursesSearch";
import CoursesFilters from "./components/CoursesFilters";

export default function CoursesHeader({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="from-dark via-dark/95 to-dark text-light relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b px-6 py-16"
    >
      {/* Glow */}
      <div className="bg-primary/20 absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl" />
      <div className="bg-primary/10 absolute right-10 -bottom-24 h-72 w-72 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">{title}</h1>

        <p className="text-light/60 mt-3 text-sm">
          جستجو و فیلتر بین دوره‌های آموزشی
        </p>

        {/* Search */}
        <div className="flex justify-center">
          <CoursesSearch />
        </div>

        {/* Filters */}
        <CoursesFilters />

        {/* Breadcrumb */}
        <div className="mt-8 flex justify-center">
          <Breadcrumb title1="دوره‌ها" link1="/courses" />
        </div>
      </div>

      <div className="bg-primary/60 absolute bottom-0 left-1/2 h-1 w-40 -translate-x-1/2 rounded-full blur-sm" />
    </motion.div>
  );
}
