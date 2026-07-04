"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LuMail, LuLockKeyhole, LuEye, LuEyeOff } from "react-icons/lu";
import toast from "react-hot-toast";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
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

    if (loading) return;

    const { email, password } = form;

    if (!email || !password) {
      toast.error("ایمیل و رمز عبور الزامی است");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (!data?.user) {
        toast.error("ورود ناموفق بود");
        return;
      }

      toast.success("خوش آمدید 👋");

      setForm({
        email: "",
        password: "",
      });

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      toast.error("خطای شبکه یا Supabase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex items-center justify-center overflow-hidden px-6 py-12">
      {/* Glow */}
      <div className="bg-primary/10 absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" />

      <div className="bg-lighter/80 dark:bg-dark/80 relative z-10 w-full max-w-md rounded-3xl border border-zinc-200/70 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold">ورود به حساب کاربری</h1>
          <p className="text-sm text-zinc-500">برای دسترسی به پنل وارد شوید</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="example@email.com"
                className="w-full rounded-xl border border-zinc-300 bg-transparent py-3 pr-10 pl-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 dark:border-zinc-700"
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
                placeholder="••••••••"
                className="w-full rounded-xl border border-zinc-300 bg-transparent py-3 pr-10 pl-12 outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 dark:border-zinc-700"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-primary cursor-pointer py-3 font-medium text-white shadow-lg transition hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 border-t border-zinc-200 pt-6 text-center text-sm dark:border-zinc-800">
          <span className="text-zinc-500">حساب ندارید؟</span>

          <Link href="/register" className="text-primary mr-1 font-medium">
            ثبت‌نام کنید
          </Link>
        </div>
      </div>
    </main>
  );
}
