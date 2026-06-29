"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  LuAlignRight,
  LuX,
  LuLayoutDashboard,
  LuBookOpen,
  LuLogOut,
} from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import CoursesDropdown from "./CoursesDropdown";
import { createClient } from "@/lib/supabase/client";

export default function Burgermenu() {
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    let ignore = false;

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user ?? null;

      if (ignore) return;

      setUser(currentUser);

      if (currentUser) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", currentUser.id)
          .single();

        if (!ignore) setProfile(profileData);
      } else {
        setProfile(null);
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

    return () => {
      ignore = true;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {/* BTN */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center md:hidden"
      >
        <LuAlignRight className="size-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* MENU WRAPPER (FULL RESPONSIVE, NO INTERNAL SCROLL) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="border-dark/10 bg-light dark:bg-darker dark:text-lighter scrollbar-hide fixed top-1/2 left-1/2 z-50 max-h-[85vh] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border p-6 shadow-2xl md:max-w-xl lg:max-w-2xl"
            >
              {/* HEADER */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-primary font-morabba text-2xl">
                  دسته‌بندی‌ها
                </h2>

                <button onClick={() => setIsOpen(false)}>
                  <LuX className="size-5" />
                </button>
              </div>

              {/* COURSES */}
              <CoursesDropdown onClose={() => setIsOpen(false)} />

              {/* AUTH */}
              {!loading && (
                <div className="mt-8">
                  {!user ? (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="bg-primary flex w-full items-center justify-center rounded-2xl py-3 text-sm text-white transition hover:opacity-90"
                    >
                      ورود / ثبت‌نام
                    </Link>
                  ) : (
                    <div className="space-y-5">
                      {/* USER INFO */}
                      <div className="border-dark/10 flex items-center justify-center gap-3 border-t pt-6">
                        <div className="bg-darker h-14 w-14 overflow-hidden rounded-full">
                          <Image
                            src={
                              profile?.avatar_url ||
                              "/images/default-avatar.jpg"
                            }
                            alt="user avatar"
                            width={120}
                            height={120}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div dir="ltr" className="max-w-2/3 text-right">
                          <p className="line-clamp-1 font-bold">
                            {profile?.username || "کاربر"}
                          </p>
                          <p className="line-clamp-1 opacity-60">
                            {user?.email}
                          </p>
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <Link
                          href="/panel"
                          onClick={() => setIsOpen(false)}
                          className="group border-dark/10 bg-dark/5 hover:bg-primary/10 flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition"
                        >
                          <LuLayoutDashboard className="size-4 opacity-70 group-hover:opacity-100" />
                          پیشخوان
                        </Link>

                        <Link
                          href="/courses"
                          onClick={() => setIsOpen(false)}
                          className="group border-dark/10 bg-dark/5 hover:bg-primary/10 flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm transition"
                        >
                          <LuBookOpen className="size-4 opacity-70 group-hover:opacity-100" />
                          دوره‌ها
                        </Link>

                        <button
                          onClick={async () => {
                            await supabase.auth.signOut({ scope: "global" });
                            setUser(null);
                            setProfile(null);
                            setIsOpen(false);
                          }}
                          className="group flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500 transition hover:bg-red-500/10"
                        >
                          <LuLogOut className="size-4" />
                          خروج
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
