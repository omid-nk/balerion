"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { LuAlignJustify, LuUserRound, LuX } from "react-icons/lu";

import Logo from "../../shared/Logo";

export default function HeaderMobileMenu({
  items,
  hasLoggedin,
  isOpen,
  onOpen,
  onClose,
}) {
  return (
    <>
      {/* Burger Button */}
      <button
        type="button"
        onClick={onOpen}
        className="block cursor-pointer md:hidden"
        aria-label="باز کردن منو"
        aria-expanded={isOpen}
      >
        <LuAlignJustify className="size-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

            {/* Menu */}
            <motion.section
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="bg-light dark:bg-dark fixed top-0 right-0 bottom-0 z-50 flex w-[85%] max-w-sm flex-col p-5 will-change-transform md:hidden"
            >
              {/* Header */}
              <div className="border-border flex items-center justify-between border-b pb-4">
                <Logo />

                <button
                  type="button"
                  onClick={onClose}
                  className="hover:text-primary cursor-pointer transition-colors"
                  aria-label="بستن منو"
                >
                  <LuX className="size-6" />
                </button>
              </div>

              {/* Items */}
              <nav className="mt-5 flex-1 overflow-y-auto">
                <ul className="flex flex-col gap-1">
                  {items.map((item) => {
                    const Icon = item.icon;

                    return (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="hover:bg-primary/10 hover:text-primary flex items-center gap-3 rounded-xl px-3 py-3 transition-colors"
                        >
                          <Icon className="size-5 shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Auth */}
              <div className="border-border mt-4 flex gap-2 border-t pt-4">
                {hasLoggedin ? (
                  <Link
                    href="/profile"
                    onClick={onClose}
                    className="hover:bg-primary/10 hover:text-primary border-border flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors"
                  >
                    <LuUserRound className="size-5" />
                    پروفایل
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={onClose}
                      className="hover:bg-primary/10 hover:text-primary border-border flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors"
                    >
                      <LuUserRound className="size-5" />
                      ورود
                    </Link>

                    <Link
                      href="/register"
                      onClick={onClose}
                      className="bg-primary hover:bg-primary/90 text-light flex flex-1 items-center justify-center rounded-xl px-3 py-2.5 text-sm transition-colors"
                    >
                      ثبت‌نام
                    </Link>
                  </>
                )}
              </div>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
