"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LuLayoutDashboard,
  LuBookOpen,
  LuSettings,
  LuUserRound,
  LuLogOut,
  LuChevronLeft,
} from "react-icons/lu";

export default function PanelSidebar() {
  const pathname = usePathname();

  const menus = [
    {
      title: "داشبورد",
      href: "/panel",
      icon: LuLayoutDashboard,
    },
    {
      title: "دوره‌های من",
      href: "/panel/courses",
      icon: LuBookOpen,
    },
    {
      title: "اطلاعات کاربری",
      href: "/panel/profile",
      icon: LuUserRound,
    },
    {
      title: "تنظیمات",
      href: "/panel/settings",
      icon: LuSettings,
    },
  ];

  return (
    <aside className="sticky top-24 w-full lg:w-80 overflow-hidden rounded-4xl border border-gray-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="bg-linear-to-br from-primary via-primary to-primary/80 p-7 text-white">
        <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 shadow-xl">
          <Image
            src="/images/panel/avatar-default.jpg"
            alt="Avatar"
            width={150}
            height={150}
            className="h-full w-full object-cover"
          />
        </div>

        <h2 className="mt-5 text-center text-xl font-bold">امید دلیری</h2>

        <p className="mt-1 text-center text-sm text-white/80">
          omiidnk02@gmail.com
        </p>

        <div className="mt-5 flex justify-center">
          <span className="rounded-full bg-white/15 px-4 py-1 text-xs backdrop-blur">
            🎓 دانشجو
          </span>
        </div>
      </div>

      {/* Menu */}
      <div className="p-5">
        <nav className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300
                ${
                  active
                    ? "bg-primary text-white shadow-lg"
                    : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-xl p-2 transition-all
                    ${
                      active
                        ? "bg-white/20"
                        : "bg-gray-100 group-hover:bg-primary group-hover:text-white dark:bg-zinc-800"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <span className="font-medium">{item.title}</span>
                </div>

                <LuChevronLeft
                  size={18}
                  className={`transition-all ${
                    active ? "" : "group-hover:-translate-x-1"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200 dark:bg-zinc-800" />

        {/* Logout */}
        <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-500 py-3 font-medium text-red-500 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20">
          <LuLogOut size={18} />
          خروج از حساب
        </button>
      </div>
    </aside>
  );
}
