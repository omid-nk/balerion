"use client";

import toast from "react-hot-toast";

import Link from "next/link";

import { useState } from "react";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { LuCircleCheck, LuEye, LuEyeOff, LuLock, LuMail } from "react-icons/lu";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showVerify, setShowVerify] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("فیلدهای ضروری را پر کنید");
      return;
    }

    setLoading(true);

    const loadingToast = toast.loading("در حال ورود...");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      toast.dismiss(loadingToast);

      if (error) {
        const message = error.message.toLowerCase();

        if (
          message.includes("email not confirmed") ||
          message.includes("email_not_confirmed")
        ) {
          setShowVerify(true);

          toast.error("ایمیل شما هنوز تایید نشده است");
        } else if (
          message.includes("invalid login credentials") ||
          message.includes("invalid credentials")
        ) {
          toast.error("ایمیل یا رمز عبور اشتباه است");
        } else {
          toast.error(error.message);
        }

        return;
      }

      if (!data?.user) {
        toast.error("ورود انجام نشد");
        return;
      }

      // اطمینان از تایید شدن ایمیل
      if (!data.user.email_confirmed_at) {
        setShowVerify(true);

        toast.error("ایمیل شما هنوز تایید نشده است");

        return;
      }

      toast.success("با موفقیت وارد شدید");
      router.push("/");
    } catch (error) {
      console.error(error);

      toast.dismiss(loadingToast);
      toast.error("خطا در ورود");
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    if (resendCooldown > 0 || resendLoading) return;

    setResendLoading(true);

    const loadingToast = toast.loading("در حال ارسال دوباره ایمیل تایید...");

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email.trim(),
      });

      toast.dismiss(loadingToast);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("ایمیل تایید دوباره ارسال شد ✉️");

      setResendCooldown(60);

      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      console.error(error);

      toast.dismiss(loadingToast);
      toast.error("خطا در ارسال ایمیل");
    } finally {
      setResendLoading(false);
    }
  };

  if (showVerify) {
    return (
      <>
        <header className="text-center">
          <div className="bg-primary/10 text-primary mx-auto mb-5 flex size-16 items-center justify-center rounded-full">
            <LuCircleCheck className="size-8" />
          </div>

          <h1 className="text-2xl font-semibold">ایمیل خود را تایید کنید</h1>

          <p className="text-dark/60 dark:text-light/60 mt-3 text-sm leading-7">
            ایمیل شما هنوز تایید نشده است.
            <br />
            لطفاً ابتدا ایمیل خود را تایید کنید.
          </p>

          <p dir="ltr" className="text-dark dark:text-light mt-2 font-medium">
            {email}
          </p>
        </header>

        <div className="bg-border/30 border-border mt-6 rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <LuMail className="text-primary mt-0.5 size-5 shrink-0" />

            <p className="text-dark/70 dark:text-light/70 text-sm leading-6">
              وارد ایمیل خود شوید و روی لینک تایید کلیک کنید.
              <br />
              اگر ایمیل را پیدا نکردید، پوشه Spam یا Junk را هم بررسی کنید.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResendEmail}
          disabled={resendCooldown > 0 || resendLoading}
          className="text-primary mt-5 w-full cursor-pointer text-sm font-medium transition-opacity hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-50"
        >
          {resendLoading
            ? "در حال ارسال..."
            : resendCooldown > 0
              ? `ارسال دوباره ایمیل (${resendCooldown} ثانیه)`
              : "ارسال دوباره ایمیل تایید"}
        </button>

        <Link
          href="/register"
          className="border-border text-dark dark:text-light hover:bg-border/30 mt-6 block w-full rounded-lg border py-2.5 text-center font-medium transition-all"
        >
          ایجاد حساب کاربری
        </Link>
      </>
    );
  }

  return (
    <>
      <header className="text-center">
        <h1 className="text-2xl font-semibold">ورود به حساب کاربری</h1>

        <p className="text-dark/60 dark:text-light/60 mt-3 text-xs">
          برای دسترسی به حساب خود وارد شوید
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3 text-sm">
          {/* Email */}
          <div className="space-y-1.5">
            <div className="border-border bg-border/30 focus-within:border-primary flex items-center gap-2.5 rounded-lg border px-4 py-3 transition-colors">
              <LuMail
                aria-hidden="true"
                className="text-primary/60 size-5 shrink-0"
              />

              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ایمیل"
                autoComplete="email"
                dir="ltr"
                disabled={loading}
                className="placeholder:text-dark/40 dark:placeholder:text-light/40 w-full border-0 bg-transparent text-right outline-0 placeholder:text-right disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="border-border bg-border/30 focus-within:border-primary flex items-center gap-2.5 rounded-lg border px-4 py-3 transition-colors">
              <LuLock
                aria-hidden="true"
                className="text-primary/60 size-5 shrink-0"
              />

              <input
                id="password"
                name="password"
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="رمز عبور"
                autoComplete="current-password"
                dir="ltr"
                disabled={loading}
                className="placeholder:text-dark/40 dark:placeholder:text-light/40 w-full border-0 bg-transparent text-right outline-0 placeholder:text-right disabled:cursor-not-allowed disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setVisible((prev) => !prev)}
                disabled={loading}
                aria-label={visible ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
                className="text-dark/50 dark:text-light/50 hover:text-dark dark:hover:text-light shrink-0 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                {visible ? (
                  <LuEyeOff aria-hidden="true" className="size-5" />
                ) : (
                  <LuEye aria-hidden="true" className="size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-light w-full cursor-pointer rounded-lg py-2.5 font-medium transition-all hover:brightness-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "در حال ورود..." : "ورود"}
        </button>
      </form>

      <p className="text-dark/60 dark:text-light/60 mt-4 text-center text-sm">
        حساب کاربری ندارید؟
        <Link
          href="/register"
          className="text-primary px-1 font-medium hover:underline"
        >
          ثبت‌نام کنید
        </Link>
      </p>
    </>
  );
}
