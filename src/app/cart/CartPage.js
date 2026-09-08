"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function CartPage() {
  const [cart, setCart] = useState("");

  if (!cart) {
    return (
      <main className="ring-border flex min-h-80 flex-col items-center justify-center rounded-lg p-12 text-center ring select-none">
        {/* Empty Object Animation */}
        <motion.div
          className="mb-6 flex items-center justify-center font-mono text-6xl font-bold"
          animate={{
            y: [0, 0, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="text-primary"
            animate={{
              x: [0, -3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {"["}
          </motion.span>

          <span className="relative mx-2 flex h-12 w-3 items-center justify-center">
            <motion.span
              className="bg-primary absolute h-9 w-1 rounded-full"
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </span>

          <motion.span
            className="text-primary"
            animate={{
              x: [0, 3, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {"]"}
          </motion.span>
        </motion.div>

        <h2 className="mb-2 text-lg font-bold">سبد خرید شما خالی است.</h2>

        <p className="text-dark-1/50 dark:text-light-1/50 text-sm">
          هنوز هیچ دوره‌ای به سبد خرید اضافه نکرده‌اید.
        </p>
      </main>
    );
  }

  return <main></main>;
}
