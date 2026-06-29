"use client";

import { useState, useEffect } from "react";
import { LuUserRound } from "react-icons/lu";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

import {
  LuPentagon,
  LuFolderOpen,
  LuCreditCard,
  LuMessagesSquare,
} from "react-icons/lu";

export default function AuthSection() {
  const supabase = createClient();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 get user + profile
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user ?? null;

      setUser(currentUser);

      if (currentUser) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        setProfile(profileData);
      }

      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single()
          .then(({ data }) => setProfile(data));
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut({ scope: "global" });
    setUser(null);
    setProfile(null);
    setUserMenuOpen(false);
  };

  return (
    <>
      {!loading ? (
        <>
          {/* NOT LOGGED IN */}
          {!user ? (
            <Link
              href="/login"
              className="bg-primary/10 dark:bg-primary/20 text-primary border-primary/20 hover:bg-primary hover:text-light hover:border-primary hidden items-center justify-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all md:inline-flex"
            >
              ورود / ثبت‌نام
            </Link>
          ) : (
            /* LOGGED IN USER DROPDOWN */
            <div
              onMouseEnter={() => setUserMenuOpen(true)}
              onMouseLeave={() => setUserMenuOpen(false)}
              className="relative"
            >
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="group relative mr-2 hidden cursor-pointer md:block"
                aria-label="منوی کاربری"
                aria-expanded={userMenuOpen}
              >
                <LuUserRound className="size-5" />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 z-100 w-fit pt-4"
                  >
                    <div className="divide-dark/10 dark:divide-light/10 dark:bg-dark bg-lighter min-w-64 divide-y rounded-xl p-5 shadow-md">
                      {/* header */}
                      <header className="flex items-center gap-3 pb-4">
                        <div className="bg-darker h-12 w-12 overflow-hidden rounded-full">
                          <Image
                            src={
                              profile?.avatar_url ||
                              "/images/panel/avatar-default.jpg"
                            }
                            alt="user profile avatar"
                            width={100}
                            height={100}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div dir="ltr" className="max-w-3/4 text-right text-sm">
                          <p className="line-clamp-1 font-bold">
                            {profile?.full_name || profile?.username || "کاربر"}
                          </p>
                          <p className="text-dark/60 dark:text-light/40 mt-1 line-clamp-1 text-xs">
                            {user?.email}
                          </p>
                        </div>
                      </header>

                      {/* body */}
                      <ul className="*:hover:bg-dark/5 *:dark:hover:bg-light/5 px-1 py-4 text-sm *:cursor-pointer *:rounded-lg *:px-2 *:py-2">
                        <li>
                          <Link
                            className="flex gap-2 py-0.5"
                            href={"/panel"}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LuPentagon className="mt-0.5 text-lg" />
                            <span>پیشخوان</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="flex gap-2 py-0.5"
                            href={"/"}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LuFolderOpen className="mt-0.5 text-lg" />
                            <span>دوره‌های من</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="flex gap-2 py-0.5"
                            href={"/"}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LuCreditCard className="mt-0.5 text-lg" />
                            <span>اشتراک و تراکنش</span>
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="flex gap-2 py-0.5"
                            href={"/"}
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <LuMessagesSquare className="mt-0.5 text-lg" />
                            <span>پرسش و پاسخ‌ها</span>
                          </Link>
                        </li>
                      </ul>

                      {/* logout */}
                      <button
                        onClick={handleLogout}
                        className="mt-2 w-full cursor-pointer rounded-lg bg-red-600/5 p-2.5 text-center text-xs text-red-600 dark:bg-red-400/10 dark:text-red-400"
                      >
                        خروج از حساب کاربری
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </>
      ) : (
        <div className="bg-dark/20 dark:bg-light/20 hidden size-6 animate-pulse rounded-lg md:block" />
      )}
    </>
  );
}
