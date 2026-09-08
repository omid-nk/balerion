"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuLogOut, LuX } from "react-icons/lu";

import { createClient } from "@/lib/supabase/client";

export default function ProfileLogout() {
  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // بستن با Escape + جلوگیری از اسکرول صفحه
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, loading]);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);

        toast.error("خروج از حساب انجام نشد");
        setLoading(false);

        return;
      }

      setOpen(false);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      toast.error("خطایی هنگام خروج از حساب رخ داد");
      setLoading(false);
    }
  };

  return (
    <>
      {/* Logout Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition-all duration-200 hover:bg-red-500/10 active:scale-[0.98]"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-red-500/10 transition-colors group-hover:bg-red-500/15">
          <LuLogOut className="size-4.5" />
        </span>

        <span>خروج از حساب کاربری</span>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-title"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="بستن"
            disabled={loading}
            onClick={() => setOpen(false)}
            className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-[3px] disabled:pointer-events-none"
          />

          {/* Modal */}
          <div className="bg-light animate-in fade-in zoom-in-95 dark:bg-dark relative z-10 w-full max-w-105 overflow-hidden rounded-2xl border border-black/5 shadow-2xl duration-200 dark:border-white/5">
            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}
              aria-label="بستن"
              className="text-dark/40 hover:text-dark dark:text-light/40 dark:hover:text-light absolute top-4 left-4 flex size-9 items-center justify-center rounded-xl transition-colors hover:bg-black/5 disabled:pointer-events-none dark:hover:bg-white/5"
            >
              <LuX className="size-5" />
            </button>

            {/* Content */}
            <div className="px-6 pt-7 pb-6">
              {/* Icon */}
              <div className="mb-5 flex size-14 items-center justify-center rounded-2xl bg-red-500/10 text-red-500">
                <LuLogOut className="size-7" />
              </div>

              <h2
                id="logout-title"
                className="text-dark dark:text-light text-lg font-bold"
              >
                خروج از حساب کاربری
              </h2>

              <p className="text-dark/55 dark:text-light/55 mt-2 text-sm leading-7">
                آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 border-t border-black/5 bg-black/2 p-4 dark:border-white/5 dark:bg-white/2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                disabled={loading}
                className="text-dark/70 dark:text-light/70 flex-1 rounded-xl border border-black/10 py-3 text-sm font-medium transition-all hover:bg-black/5 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 dark:border-white/10 dark:hover:bg-white/5"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loading}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-3 text-sm font-medium text-white transition-all hover:bg-red-600 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    در حال خروج...
                  </>
                ) : (
                  <>
                    <LuLogOut className="size-4.25" />
                    خروج
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
