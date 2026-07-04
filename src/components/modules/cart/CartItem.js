"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { LuTrash2 } from "react-icons/lu";

export default function CartItem({ course, onRemove }) {
  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.96,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.92,
        x: -80,
        height: 0,
        marginBottom: 0,
        filter: "blur(12px)",
        transition: {
          duration: 0.35,
        },
      }}
      whileHover={{
        y: -6,
      }}
      transition={{
        layout: {
          duration: 0.45,
          type: "spring",
        },
        duration: 0.4,
      }}
      className=" group relative overflow-hidden rounded-3xl border border-dark/10 dark:border-light/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl "
    >
      {/* Glow */}

      <div className=" absolute inset-0 opacity-0  duration-500 group-hover:opacity-100 pointer-events-none">
        <div className=" absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="relative flex gap-5 p-4">
        {/* Cover */}

        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <Link href={`/course/${course.slug}`}>
            <Image
              src={course.cover_url}
              alt={course.name}
              width={180}
              height={100}
              className=" h-28 w-44 rounded-2xl object-cover shadow-lg"
            />
          </Link>
        </motion.div>

        {/* Info */}

        <div className="flex flex-1 flex-col justify-between">
          <Link
            href={`/course/${course.slug}`}
            className="
            text-base
            font-medium
            group-hover:text-primary
            "
          >
            {course.name}
          </Link>

          <div className="flex items-center justify-between">
            <motion.span
              layout
              className=" rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary"
            >
              {Number(course.price) === 0
                ? "رایگان"
                : `${Number(course.price).toLocaleString()} تومان`}
            </motion.span>

            <motion.button
              whileHover={{
                scale: 1.15,
                rotate: -10,
              }}
              whileTap={{
                scale: 0.9,
              }}
              transition={{
                type: "spring",
                stiffness: 450,
              }}
              onClick={() => onRemove(course.id)}
              className=" relative overflow-hidden rounded-xl p-3 text-red-500  hover:bg-red-500/10 "
            >
              <motion.div
                initial={{
                  scale: 0,
                  opacity: 0.3,
                }}
                whileTap={{
                  scale: 3,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.5,
                }}
                className=" absolute inset-0 rounded-full bg-red-500 "
              />

              <LuTrash2 className="relative z-10 text-lg" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
