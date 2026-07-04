"use client";

import Link from "next/link";

import { motion } from "framer-motion";

import { LuShoppingCart, LuArrowLeft, LuSparkles } from "react-icons/lu";

export default function EmptyCart() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.6,
      }}
      className=" relative overflow-hidden rounded-[36px] border border-dark/10 dark:border-light/10 bg-white/60 dark:bg-white/3 backdrop-blur-xl px-8 py-20 "
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute inset-0">
        <div className=" absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[110px] " />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Icon */}

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="relative"
        >
          <div className=" absolute inset-0 rounded-full bg-primary/20 blur-2xl scale-150 " />

          <div className=" relative flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 ">
            <LuShoppingCart className="text-primary text-5xl" />
          </div>
        </motion.div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
          className=" mt-10 text-2xl font-bold "
        >
          سبد خرید شما خالی است
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 0.7,
          }}
          transition={{
            delay: 0.3,
          }}
          className=" mt-3 max-w-md text-center leading-8 "
        >
          هنوز هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید. از بین دوره‌های آموزشی،
          مسیر یادگیری خودتان را شروع کنید.
        </motion.p>

        {/* Button */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.45,
          }}
          className="mt-10"
        >
          <Link href="/courses">
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className=" group relative overflow-hidden rounded-2xl bg-primary px-8 py-4 text-white "
            >
              {/* Shine */}

              <motion.div
                animate={{
                  x: ["-150%", "250%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.8,
                  ease: "linear",
                }}
                className=" absolute inset-y-0 w-20 rotate-12 bg-white/30 blur-md "
              />

              <div className="relative flex items-center gap-3">
                مشاهده دوره‌ها
                <motion.div
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                >
                  <LuArrowLeft />
                </motion.div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
