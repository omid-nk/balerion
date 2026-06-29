"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="my-8 flex items-center justify-center px-6">
      <div className="flex flex-col items-center text-center">
        {/* Number */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[120px] leading-none font-black text-zinc-200 sm:text-[160px] dark:text-zinc-900"
        >
          404
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-semibold text-zinc-800 dark:text-zinc-200"
        >
          صفحه پیدا نشد
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-zinc-500"
        >
          متأسفیم، صفحه‌ای که دنبال آن بودید وجود ندارد یا حذف شده است.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Link
            href="/"
            className="bg-primary hover:bg-primary/90 rounded-xl px-5 py-3 text-sm font-medium text-white shadow transition"
          >
            بازگشت به صفحه اصلی
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
