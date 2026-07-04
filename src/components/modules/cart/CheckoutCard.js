"use client";

import { motion } from "framer-motion";
import { LuArrowLeft, LuShieldCheck, LuBadgeCheck } from "react-icons/lu";

import AnimatedCounter from "./AnimatedCounter";

export default function CheckoutCard({ totalPrice, cartItems, onCheckout }) {
  return (
    <motion.aside
      layout
      initial={{
        opacity: 0,
        x: 40,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
      }}
      className="sticky top-24"
    >
      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.3,
        }}
        className=" relative overflow-hidden rounded-4xl border border-dark/10 dark:border-light/10 bg-white/70 dark:bg-white/3 backdrop-blur-xl p-6 shadow-xl"
      >
        {/* Glow */}

        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative">
          <h3 className="mb-6 text-lg font-semibold">خلاصه سفارش</h3>

          {/* تعداد */}

          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm opacity-70">تعداد دوره‌ها</span>

            <motion.span layout className="font-medium">
              {cartItems.length}
            </motion.span>
          </div>

          {/* مبلغ */}

          <div className="mb-8 flex items-center justify-between">
            <span className="text-sm opacity-70">قابل پرداخت</span>

            <motion.div
              layout
              key={totalPrice}
              initial={{
                scale: 0.95,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 350,
              }}
              className="text-xl font-bold text-primary"
            >
              <AnimatedCounter value={totalPrice} /> تومان
            </motion.div>
          </div>

          {/* Features */}

          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-sm opacity-80">
              <LuShieldCheck className="text-primary" />
              پرداخت امن
            </div>

            <div className="flex items-center gap-3 text-sm opacity-80">
              <LuBadgeCheck className="text-primary" />
              دسترسی دائمی به دوره
            </div>
          </div>

          {/* Button */}

          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={onCheckout}
            className=" group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-primary py-4 font-medium text-white "
          >
            {/* Shine */}

            <motion.div
              animate={{
                x: ["-150%", "250%"],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className=" absolute inset-y-0 w-16 rotate-12 bg-white/25 blur-md "
            />

            {/* Ripple */}

            <motion.div
              initial={{
                scale: 0,
                opacity: 0.25,
              }}
              whileTap={{
                scale: 6,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className=" absolute h-12 w-12 rounded-full bg-white "
            />

            <span className="relative z-10">ادامه پرداخت</span>

            <motion.div
              className="relative z-10"
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
              }}
            >
              <LuArrowLeft />
            </motion.div>
          </motion.button>
        </div>
      </motion.div>
    </motion.aside>
  );
}
