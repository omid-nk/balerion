"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import Link from "next/link";

import Logo from "../shared/Logo";

import {
  LuAlignJustify,
  LuAtSign,
  LuBookText,
  LuBot,
  LuComponent,
  LuCrown,
  LuMouse,
  LuServerCog,
  LuShieldCheck,
  LuShoppingBag,
  LuTabletSmartphone,
  LuUserRound,
  LuChevronDown,
  LuX,
} from "react-icons/lu";

import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [hasLoggedin, setHasLoggedin] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const supabase = createClient();

  function handleBurgerBtn() {
    setBurgerMenuOpen((prev) => !prev);
  }

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setHasLoggedin(!!user);
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasLoggedin(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const items = [
    {
      id: 1,
      label: "فرانت‌اند",
      icon: LuComponent,
      href: "/courses/front-end",
    },
    {
      id: 2,
      label: "بک‌اند",
      icon: LuServerCog,
      href: "/courses/back-end",
    },
    {
      id: 3,
      label: "مهارت‌های کاربردی",
      icon: LuCrown,
      href: "/courses/skill-up",
    },
    {
      id: 4,
      label: "سیستم‌عامل",
      icon: LuMouse,
      href: "/courses/os",
    },
    {
      id: 5,
      label: "اندروید و آی‌او‌ای",
      icon: LuTabletSmartphone,
      href: "/courses/mobile",
    },
    {
      id: 6,
      label: "امنیت",
      icon: LuShieldCheck,
      href: "/courses/security",
    },
    {
      id: 7,
      label: "هوش مصنوعی",
      icon: LuBot,
      href: "/courses/ai",
    },
    {
      id: 8,
      label: "مقالات",
      icon: LuBookText,
      href: "/articles",
      mobileOnly: true,
    },
    {
      id: 9,
      label: "درباره ما",
      icon: LuAtSign,
      href: "/about",
      mobileOnly: true,
    },
  ];

  return (
    <header className="mb-12">
      <div className="bg-primary text-light flex justify-center rounded-b-lg px-3 py-2 text-center text-sm">
        بالریون یک پروژه نمونه‌کار است که طراحی آن با الگوبرداری از وب‌سایت
        سبزلرن پیاده‌سازی شده است.
      </div>

      <section className="border-border flex items-center justify-between gap-6 border-b px-2 py-6 select-none">
        {/* Burger Button */}
        <button
          type="button"
          onClick={handleBurgerBtn}
          className="block cursor-pointer md:hidden"
          aria-label="باز کردن منو"
        >
          <LuAlignJustify className="size-6" />
        </button>

        {/* Burger Menu */}
        <AnimatePresence>
          {burgerMenuOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setBurgerMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
              />

              {/* Menu */}
              <motion.section
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                className="bg-light dark:bg-dark fixed top-0 right-0 bottom-0 z-50 flex w-[85%] max-w-sm flex-col p-5 md:hidden"
              >
                {/* Menu Header */}
                <div className="border-border flex items-center justify-between border-b pb-4">
                  <Logo />

                  <button
                    type="button"
                    onClick={() => setBurgerMenuOpen(false)}
                    className="hover:text-primary cursor-pointer transition-colors"
                    aria-label="بستن منو"
                  >
                    <LuX className="size-6" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="mt-5 flex-1 overflow-y-auto">
                  <ul className="flex flex-col gap-1">
                    {items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <li key={item.id}>
                          <Link
                            href={item.href}
                            onClick={() => setBurgerMenuOpen(false)}
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

                {/* Auth Buttons */}
                <div className="border-border mt-4 flex gap-2 border-t pt-4">
                  {hasLoggedin ? (
                    <Link
                      href="/profile"
                      onClick={() => setBurgerMenuOpen(false)}
                      className="hover:bg-primary/10 hover:text-primary border-border flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors"
                    >
                      <LuUserRound className="size-5" />
                      پروفایل
                    </Link>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setBurgerMenuOpen(false)}
                        className="hover:bg-primary/10 hover:text-primary border-border flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors"
                      >
                        <LuUserRound className="size-5" />
                        ورود
                      </Link>

                      <Link
                        href="/register"
                        onClick={() => setBurgerMenuOpen(false)}
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

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Logo width={140} height={100} />

          <ul className="hidden gap-5 *:cursor-pointer md:flex">
            <li
              className="relative flex items-center gap-1"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              دسته‌بندی‌ها
              <LuChevronDown
                className={`transition-transform ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
              <AnimatePresence>
                {categoriesOpen && (
                  <motion.section
                    initial={{
                      opacity: 0,
                      y: -10,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: -10,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="absolute top-full right-0 z-50 w-64 pt-4"
                  >
                    <div className="bg-light dark:bg-dark border-border flex w-full flex-col gap-1 rounded-xl border p-2 shadow-lg">
                      {items
                        .filter((item) => !item.mobileOnly)
                        .map((item) => {
                          const Icon = item.icon;

                          return (
                            <Link
                              href={item.href}
                              key={item.id}
                              className="hover:bg-primary/10 hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors"
                            >
                              <Icon className="size-5 shrink-0" />
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                    </div>
                  </motion.section>
                )}
              </AnimatePresence>
            </li>

            <Link className="hover:text-primary" href="/mags">
              مقالات
            </Link>

            <Link className="hover:text-primary" href="/about-us">
              درباره‌ما
            </Link>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 *:cursor-pointer *:p-1">
          <Link href="/cart" aria-label="سبد خرید">
            <LuShoppingBag className="size-6" />
          </Link>

          {hasLoggedin ? (
            <Link
              href="/profile"
              className="hidden md:block"
              aria-label="پروفایل"
            >
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
      </section>
    </header>
  );
}
