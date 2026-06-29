"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { createClient } from "@/lib/supabase/client";

import {
  LuUser,
  LuMail,
  LuPhone,
  LuLockKeyhole,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";

export default function RegisterPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState("form"); // form | verify

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, phone, password } = form;

    if (!username || !email || !password) {
      toast.error("فیلدهای ضروری را پر کنید");
      return;
    }

    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            phone: phone || null,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data?.user) {
        toast.error("کاربر ساخته نشد");
        return;
      }

      toast.success("ایمیل تایید ارسال شد ✉️");
      setStep("verify");
    } catch (err) {
      console.error(err);
      toast.error("خطا در ثبت‌نام");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        toast.error("خطا در بررسی کاربر");
        return;
      }

      if (data?.user?.email_confirmed_at) {
        toast.success("ایمیل تایید شد 🎉");
        router.push("/login");
      } else {
        toast.error("هنوز ایمیل تایید نشده");
      }
    } catch (err) {
      console.error(err);
      toast.error("خطا");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex items-center justify-center overflow-hidden px-6 py-12">
      <div className="bg-primary/10 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <div className="bg-lighter/80 dark:bg-dark/80 relative z-10 w-full max-w-md rounded-3xl border border-zinc-200/70 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">ایجاد حساب کاربری</h1>
          <p className="text-sm text-zinc-500">
            ثبت‌نام برای دسترسی به دوره‌ها
          </p>
        </div>

        {/* FORM STEP */}
        {step === "form" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                نام کاربری
              </label>
              <div className="relative">
                <LuUser className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 bg-transparent py-3 pr-10 pl-4 outline-none"
                  placeholder="username"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">ایمیل</label>
              <div className="relative">
                <LuMail className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className="w-full rounded-xl border border-zinc-300 bg-transparent py-3 pr-10 pl-4 outline-none"
                  placeholder="email"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                شماره تماس
              </label>
              <div className="relative">
                <LuPhone className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-300 bg-transparent py-3 pr-10 pl-4 outline-none"
                  placeholder="optional"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">رمز عبور</label>
              <div className="relative">
                <LuLockKeyhole className="absolute right-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />

                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-zinc-300 bg-transparent py-3 pr-10 pl-12 outline-none"
                  placeholder="password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                >
                  {showPassword ? <LuEyeOff /> : <LuEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-white"
            >
              {loading ? "در حال ثبت..." : "ثبت نام"}
            </button>
          </form>
        ) : (
          /* VERIFY STEP */
          <div className="space-y-4 text-center">
            <h2 className="text-xl font-bold">ایمیل تایید شد؟ 📩</h2>

            <p className="text-sm text-zinc-500">
              یک ایمیل برای شما ارسال شده. بعد از تایید روی دکمه زیر بزنید.
            </p>

            <button
              onClick={handleCheckVerification}
              disabled={loading}
              className="w-full rounded-xl bg-green-600 py-3 text-white"
            >
              بررسی تایید ایمیل
            </button>

            <button
              onClick={() => setStep("form")}
              className="text-sm text-zinc-500 underline"
            >
              برگشت
            </button>
          </div>
        )}

        <div className="mt-6 text-center text-sm text-zinc-500">
          قبلاً ثبت‌نام کردی؟{" "}
          <Link href="/login" className="text-blue-600">
            ورود
          </Link>
        </div>
      </div>
    </main>
  );
}
