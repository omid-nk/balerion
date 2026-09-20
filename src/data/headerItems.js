import {
  LuAtSign,
  LuBookText,
  LuBot,
  LuComponent,
  LuCrown,
  LuMouse,
  LuServerCog,
  LuShieldCheck,
  LuTabletSmartphone,
} from "react-icons/lu";

export const headerItems = [
  {
    id: 1,
    label: "فرانت‌اند",
    icon: LuComponent,
    href: "/courses/front-end",
  },
  {
    id: 2,
    label: "بک‌اند",
    icon: LuServerCog,
    href: "/courses/back-end",
  },
  {
    id: 3,
    label: "مهارت‌های کاربردی",
    icon: LuCrown,
    href: "/courses/skill-up",
  },
  {
    id: 4,
    label: "سیستم‌عامل",
    icon: LuMouse,
    href: "/courses/os",
  },
  {
    id: 5,
    label: "اندروید و آی‌او‌ای",
    icon: LuTabletSmartphone,
    href: "/courses/mobile",
  },
  {
    id: 6,
    label: "امنیت",
    icon: LuShieldCheck,
    href: "/courses/security",
  },
  {
    id: 7,
    label: "هوش مصنوعی",
    icon: LuBot,
    href: "/courses/ai",
  },
  {
    id: 8,
    label: "مقالات",
    icon: LuBookText,
    href: "/articles",
    mobileOnly: true,
  },
  {
    id: 9,
    label: "درباره ما",
    icon: LuAtSign,
    href: "/about-us",
    mobileOnly: true,
  },
];
