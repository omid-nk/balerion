"use client";

import { LuLock } from "react-icons/lu";

import PasswordInput from "./PasswordInput";

export default function PasswordSettings({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  loading,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="border-border rounded-2xl border p-5 md:p-6"
    >
      <div className="mb-6">
        <h2 className="font-bold">تغییر رمز عبور</h2>

        <p className="text-dark/50 dark:text-light/50 mt-1 text-sm">
          برای تغییر رمز عبور، ابتدا رمز فعلی خود را وارد کنید.
        </p>
      </div>

      <div className="space-y-5">
        {/* Current Password */}
        <PasswordInput
          id="current-password"
          label="رمز عبور فعلی"
          value={currentPassword}
          onChange={(event) => setCurrentPassword(event.target.value)}
          placeholder="رمز عبور فعلی"
          autoComplete="current-password"
        />

        {/* New Password */}
        <PasswordInput
          id="new-password"
          label="رمز عبور جدید"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="رمز عبور جدید"
          autoComplete="new-password"
        />

        <p className="text-dark/40 dark:text-light/40 text-xs">
          رمز عبور جدید باید حداقل ۸ کاراکتر باشد.
        </p>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            {loading ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                در حال تغییر...
              </>
            ) : (
              <>
                <LuLock className="size-4" />
                تغییر رمز عبور
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
