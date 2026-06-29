"use client";

import { useState } from "react";
import { LuMoon, LuBell, LuGlobe, LuMail, LuTrash2 } from "react-icons/lu";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">تنظیمات</h1>

        <p className="mt-2 text-gray-500">
          تنظیمات حساب کاربری و نحوه نمایش سایت را مدیریت کنید.
        </p>
      </div>

      {/* General */}
      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-bold">تنظیمات عمومی</h2>

        <div className="space-y-5">
          {/* Dark mode */}
          <SettingItem
            icon={<LuMoon size={20} />}
            title="حالت تاریک"
            description="فعال یا غیرفعال کردن حالت تاریک سایت"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />

          {/* Notifications */}
          <SettingItem
            icon={<LuBell size={20} />}
            title="اعلان‌ها"
            description="دریافت اعلان‌های مربوط به دوره‌ها"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />

          {/* Newsletter */}
          <SettingItem
            icon={<LuMail size={20} />}
            title="خبرنامه"
            description="دریافت ایمیل دوره‌های جدید"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
        </div>
      </section>

      {/* Language */}
      <section className="rounded-3xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-6 text-xl font-bold">زبان سایت</h2>

        <div className="flex items-center justify-between rounded-2xl border p-5">
          <div className="flex items-center gap-4">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <LuGlobe size={20} />
            </div>

            <div>
              <h3 className="font-semibold">زبان</h3>

              <p className="text-sm text-gray-500">
                زبان نمایش سایت را انتخاب کنید.
              </p>
            </div>
          </div>

          <select className="rounded-xl border px-4 py-2 outline-none focus:border-primary">
            <option>فارسی</option>
            <option>English</option>
          </select>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-3xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950/20">
        <h2 className="mb-6 text-xl font-bold text-red-600">منطقه خطر</h2>

        <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-white p-5 dark:border-red-900 dark:bg-zinc-900 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 className="font-semibold">حذف حساب کاربری</h3>

            <p className="mt-1 text-sm text-gray-500">
              با حذف حساب، تمام اطلاعات شما برای همیشه پاک خواهد شد.
            </p>
          </div>

          <button className="rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700">
            <span className="flex items-center gap-2">
              <LuTrash2 />
              حذف حساب
            </span>
          </button>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end">
        <button className="rounded-2xl bg-primary px-8 py-3 font-medium text-white transition hover:opacity-90">
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}

function SettingItem({ icon, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-xl bg-primary/10 p-3 text-primary">{icon}</div>

        <div>
          <h3 className="font-semibold">{title}</h3>

          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      <button
        onClick={onChange}
        className={`relative h-7 w-14 rounded-full transition ${
          checked ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked ? "right-8" : "right-1"
          }`}
        />
      </button>
    </div>
  );
}
