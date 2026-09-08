"use client";

import { LuMail, LuSave, LuUser } from "react-icons/lu";

import AvatarPicker from "./AvatarPicker";

export default function ProfileSettings({
  username,
  setUsername,
  avatarUrl,
  setAvatarUrl,
  email,
  loading,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-border rounded-2xl border p-5 md:p-6"
    >
      <div className="mb-6">
        <h2 className="font-bold">اطلاعات حساب</h2>

        <p className="text-dark/50 dark:text-light/50 mt-1 text-sm">
          اطلاعات عمومی حساب کاربری خود را مدیریت کنید.
        </p>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <AvatarPicker value={avatarUrl} onChange={setAvatarUrl} />

        {/* Username */}
        <div>
          <label htmlFor="username" className="mb-2 block text-sm font-medium">
            نام کاربری
          </label>

          <div className="relative">
            <LuUser className="text-dark/40 dark:text-light/40 pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="نام کاربری"
              autoComplete="username"
              className="border-border text-dark dark:text-light placeholder:text-dark/30 dark:placeholder:text-light/30 focus:border-primary focus:ring-primary/10 w-full rounded-xl border bg-transparent py-3 pr-11 pl-4 text-sm transition outline-none focus:ring-2"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            ایمیل
          </label>

          <div className="relative">
            <LuMail className="text-dark/30 dark:text-light/30 pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2" />

            <input
              id="email"
              type="email"
              value={email}
              disabled
              readOnly
              dir="ltr"
              className="border-border bg-dark/5 dark:bg-light/5 text-dark/50 dark:text-light/50 w-full cursor-not-allowed rounded-xl border py-3 pr-11 pl-4 text-sm outline-none"
            />
          </div>

          <p className="text-dark/40 dark:text-light/40 mt-2 text-xs">
            ایمیل حساب کاربری قابل تغییر نیست.
          </p>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                در حال ذخیره...
              </>
            ) : (
              <>
                <LuSave className="size-4" />
                ذخیره تغییرات
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
