import Image from "next/image";
import { LuCamera, LuShieldCheck, LuKeyRound } from "react-icons/lu";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">اطلاعات کاربری</h1>

        <p className="mt-2 text-gray-500">
          اطلاعات حساب خود را مشاهده و ویرایش کنید.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-zinc-900">
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full ring-4 ring-primary/20">
              <Image
                src="/images/panel/avatar-default.jpg"
                alt=""
                width={150}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>

            <button className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg">
              <LuCamera size={18} />
            </button>
          </div>

          <div>
            <h2 className="text-2xl font-bold">امید دلیری</h2>

            <p className="mt-1 text-gray-500">omiidnk02@gmail.com</p>

            <span className="mt-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm text-primary">
              دانشجو
            </span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-zinc-900">
        <h3 className="mb-6 text-xl font-bold">اطلاعات شخصی</h3>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              نام و نام خانوادگی
            </label>

            <input
              type="text"
              defaultValue="امید دلیری"
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">ایمیل</label>

            <input
              type="email"
              defaultValue="omiidnk02@gmail.com"
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              شماره موبایل
            </label>

            <input
              type="text"
              placeholder="09xxxxxxxxx"
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">نام کاربری</label>

            <input
              type="text"
              defaultValue="omiddev"
              className="w-full rounded-2xl border px-4 py-3 outline-none transition focus:border-primary"
            />
          </div>
        </div>

        <button className="mt-8 rounded-2xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90">
          ذخیره تغییرات
        </button>
      </div>

      {/* Security */}
      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:bg-zinc-900">
        <div className="mb-6 flex items-center gap-3">
          <LuShieldCheck size={24} className="text-green-600" />

          <h3 className="text-xl font-bold">امنیت حساب</h3>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h4 className="font-semibold">رمز عبور</h4>

            <p className="mt-1 text-sm text-gray-500">
              برای افزایش امنیت حساب خود، رمز عبور را به صورت دوره‌ای تغییر
              دهید.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-2xl border px-5 py-3 transition hover:bg-gray-100 dark:hover:bg-zinc-800">
            <LuKeyRound />
            تغییر رمز عبور
          </button>
        </div>
      </div>

      {/* Account Info */}
      <div className="rounded-3xl border bg-gradient-to-r from-primary/10 to-primary/5 p-6">
        <div className="flex flex-wrap gap-8">
          <div>
            <p className="text-sm text-gray-500">تاریخ عضویت</p>

            <h4 className="mt-1 font-bold">۱۴۰۴/۰۳/۲۱</h4>
          </div>

          <div>
            <p className="text-sm text-gray-500">تعداد دوره‌ها</p>

            <h4 className="mt-1 font-bold">۸ دوره</h4>
          </div>

          <div>
            <p className="text-sm text-gray-500">وضعیت حساب</p>

            <h4 className="mt-1 text-green-600 font-bold">فعال</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
