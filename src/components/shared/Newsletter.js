"use client";

import { useEffect, useState } from "react";

import { LuCheck, LuMail } from "react-icons/lu";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!sent) return;

    const timer = setTimeout(() => {
      setSent(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [sent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSent(true);
    setEmail("");
  };

  return (
    <div className="">
      {/* Header */}{" "}
      <div className="mb-4 flex items-center gap-2">
        {" "}
        <LuMail className="text-primary" />{" "}
        <h3 className="text-base">خبرنامه بالریون</h3>{" "}
      </div>
      {/* Description */}
      <p className="text-light/60 mb-4 text-sm leading-6">
        جدیدترین دوره‌ها، مقالات و نکات برنامه‌نویسی رو دریافت کن.
      </p>
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-1.5 sm:flex-row"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل خود را وارد کنید"
          autoComplete="email"
          required
          disabled={sent}
          aria-label="ایمیل"
          className="focus:border-primary/40 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition outline-none placeholder:text-sm placeholder:text-white/40 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          type="submit"
          disabled={sent}
          aria-label={sent ? "ثبت شد" : "ثبت ایمیل"}
          className="bg-primary hover:bg-primary/90 flex size-12 w-full shrink-0 items-center justify-center rounded-xl transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:hover:scale-100 sm:w-12"
        >
          {sent ? <LuCheck /> : <LuMail />}
        </button>
      </form>
      {/* Status */}
      {sent && (
        <p className="mt-3 text-xs text-green-600" role="status">
          ایمیل شما با موفقیت ثبت شد ✨
        </p>
      )}
    </div>
  );
}
