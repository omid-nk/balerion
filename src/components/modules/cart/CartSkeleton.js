"use client";

import { motion } from "framer-motion";

function Skeleton({ className }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="absolute inset-0 bg-dark/5 dark:bg-light/5" />

      <motion.div
        animate={{
          x: ["-100%", "220%"],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "linear",
        }}
        className=" absolute inset-y-0 w-32 -skew-x-12 bg-linear-to-r from-transparent via-white/50 to-transparent dark:via-white/10"
      />
    </div>
  );
}

function SkeletonCard() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className=" rounded-3xl border border-dark/10 dark:border-light/10 p-4 "
    >
      <div className="flex gap-5">
        <Skeleton className="h-28 w-44 shrink-0" />

        <div className="flex flex-1 flex-col justify-between">
          <Skeleton className="h-5 w-3/4" />

          <div className="flex justify-between">
            <Skeleton className="h-8 w-24 rounded-full" />

            <Skeleton className="h-10 w-10 rounded-xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CartSkeleton() {
  return (
    <section className="my-10">
      <Skeleton className="mb-8 h-8 w-40" />

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 space-y-5">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <aside className="lg:w-96">
          <div className=" rounded-3xl border border-dark/10 dark:border-light/10 p-6 ">
            <Skeleton className="mb-8 h-6 w-36" />

            <Skeleton className="mb-4 h-5 w-full" />

            <Skeleton className="mb-8 h-5 w-3/4" />

            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
        </aside>
      </div>
    </section>
  );
}
