"use client";

import { useState } from "react";
import { LuMail, LuCheck } from "react-icons/lu";

export default function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    setSent(true);
    setEmail("");

    setTimeout(() => {
      setSent(false);
    }, 2500);
  };

  return (
    <div className="rounded-2xl sm:border border-white/10 sm:bg-white/5 sm:p-5 sm:backdrop-blur-xl">
      {/* HEADER */}
      <div className="mb-4 flex items-center gap-2">
        <LuMail className="text-primary" />
        <h3 className="text-base font-semibold">خبرنامه بالریون</h3>
      </div>

      <p className="text-light/60 mb-4 text-sm leading-6">
        جدیدترین دوره‌ها، مقالات و نکات برنامه‌‌نویسی رو دریافت کن.
      </p>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex gap-1.5 ">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل خود را وارد کنید"
          className="focus:border-primary/40 sm:flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 placeholder:text-sm "
        />

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 flex h-12 w-12 items-center justify-center rounded-xl transition hover:scale-105 active:scale-95"
        >
          {sent ? <LuCheck /> : <LuMail />}
        </button>
      </form>

      {/* STATUS */}
      {sent && (
        <p className="mt-3 text-xs text-green-400">با موفقیت ثبت شد ✨</p>
      )}
    </div>
  );
}
