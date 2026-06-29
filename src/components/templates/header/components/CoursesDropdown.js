import {
  LuChevronLeft,
  LuComponent,
  LuServerCog,
  LuCrown,
  LuTabletSmartphone,
  LuMouse,
  LuShieldCheck,
  LuBookText,
  LuAtSign,
  LuBot,
} from "react-icons/lu";
import Link from "next/link";

const items = [
  { label: "فرانت‌اند", icon: LuComponent, href: "/courses/front-end" },
  { label: "بک‌اند", icon: LuServerCog, href: "/courses/back-end" },
  {
    label: "مهارت‌های کاربردی",
    icon: LuCrown,
    href: "/courses/skill-up",
  },
  { label: "سیستم‌عامل", icon: LuMouse, href: "/courses/os" },
  {
    label: "اندروید و آی‌او‌ای",
    icon: LuTabletSmartphone,
    href: "/courses/mobile",
  },
  {
    label: "امنیت",
    icon: LuShieldCheck,
    href: "/courses/security",
  },
  {
    label: "هوش مصنوعی",
    icon: LuBot,
    href: "/courses/ai",
  },

  { label: "مقالات", icon: LuBookText, href: "/articles", mobileOnly: true },
  { label: "درباره ما", icon: LuAtSign, href: "/about", mobileOnly: true },
];

export default function NavItems({ onClose }) {
  return (
    <ul className="flex flex-col gap-1 text-sm">
      {items.map(({ label, icon: Icon, href, mobileOnly }) => (
        <li
          key={label}
          className={`hover:bg-dark/5 w-full rounded-xl dark:hover:bg-white/5 ${mobileOnly ? "md:hidden" : ""} `}
        >
          <Link
            href={href}
            onClick={onClose}
            className="flex w-full items-center justify-between gap-2 px-2 py-2"
          >
            {/* Left */}
            <div className="flex items-center gap-2">
              <Icon className="size-4 opacity-80" />
              <span className="text-sm">{label}</span>
            </div>

            {/* Arrow */}
            <LuChevronLeft className="size-4 opacity-60" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
