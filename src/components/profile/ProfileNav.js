"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LuHeart,
  LuLayoutDashboard,
  LuMessageSquareText,
  LuPackage,
  LuSettings,
} from "react-icons/lu";

const menuItems = [
  {
    title: "داشبورد",
    href: "/profile",
    icon: LuLayoutDashboard,
  },
  {
    title: "دوره‌ها",
    href: "/profile/courses",
    icon: LuPackage,
  },
  {
    title: "لیست علاقه‌مندی‌ها",
    href: "/profile/favorites",
    icon: LuHeart,
  },
  {
    title: "تیکت و پشتیبانی",
    href: "/profile/tickets",
    icon: LuMessageSquareText,
  },
  {
    title: "تنظیمات",
    href: "/profile/settings",
    icon: LuSettings,
  },
];

export default function ProfileNav() {
  const pathname = usePathname();

  return (
    <nav>
      <p className="text-dark/40 dark:text-light/40 mb-2 px-3 text-xs font-medium">
        حساب کاربری
      </p>

      <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/profile"
              ? pathname === "/profile"
              : pathname.startsWith(item.href);

          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-dark/70 dark:text-light/70 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <Icon className="size-5 shrink-0" />

                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
