"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";

import { LuShoppingBag, LuUserRound } from "react-icons/lu";

export default function HeaderActions({ cartCount, hasLoggedin }) {
  return (
    <div className="flex items-center gap-3 *:cursor-pointer *:p-1">
      {/* Cart */}
      <Link
        href="/cart"
        aria-label={
          cartCount > 0 ? `سبد خرید، ${cartCount} دوره` : "سبد خرید خالی"
        }
        className="relative"
      >
        <motion.div whileTap={{ scale: 0.9 }} className="relative">
          <LuShoppingBag className="size-6" />

          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                }}
                className="bg-primary text-light ring-light dark:ring-dark absolute -top-2 -right-2 flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[9px] leading-none font-bold ring-2"
              >
                {cartCount > 99 ? "99+" : cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </Link>

      {/* User */}
      {hasLoggedin ? (
        <Link href="/profile" className="hidden md:block" aria-label="پروفایل">
          <LuUserRound className="size-6" />
        </Link>
      ) : (
        <Link
          href="/login"
          className="bg-primary border-primary text-light hidden h-full rounded-lg border-3 text-sm transition-all md:block"
        >
          <span className="p-3">ورود | ثبت‌نام</span>
        </Link>
      )}
    </div>
  );
}
