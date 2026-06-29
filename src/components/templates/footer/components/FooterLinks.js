import Link from "next/link";

const links = [
  {
    title: "دوره‌های آموزشی",
    href: "/courses",
  },
  {
    title: "شروع برنامه‌نویسی",
    href: "/start-programming",
  },
  {
    title: "مقالات",
    href: "/mags",
  },
  {
    title: "درباره ما",
    href: "/about-us",
  },
  {
    title: "ارتباط با ما",
    href: "/contact-us",
  },
];

export default function FooterLinks() {
  return (
    <>
      <h3 className="mb-4 text-base font-bold">لینک‌های مفید</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-light/70 hover:text-primary text-sm transition"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
