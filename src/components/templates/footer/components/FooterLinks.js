import Link from "next/link";

const links = [
  {
    id: 1,
    title: "دوره‌های آموزشی",
    href: "/courses",
  },
  {
    id: 2,
    title: "شروع برنامه‌نویسی",
    href: "/courses",
  },
  {
    id: 3,
    title: "مقالات",
    href: "/mags",
  },
  {
    id: 4,
    title: "درباره ما",
    href: "/about-us",
  },
  {
    id: 5,
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
          <li key={link.id}>
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
