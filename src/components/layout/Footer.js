import Link from "next/link";

import {
  LuChartNoAxesGantt,
  LuHexagon,
  LuCopyright,
  LuLinkedin,
  LuGithub,
  LuMail,
  LuSend,
} from "react-icons/lu";

import ThemeToggle from "../shared/ThemeToggle";
import Newsletter from "../shared/Newsletter";

import Image from "next/image";

export default function Footer() {
  const importantLinks = [
    { id: 1, name: "دوره‌های آموزشی", href: "/courses" },
    { id: 2, name: "شروع برنامه‌نویسی", href: "/start-programming" },
    { id: 3, name: "مقالات", href: "/mags" },
    { id: 4, name: "درباره ما", href: "/about-us" },
    { id: 5, name: "ارتباط با ما", href: "/contact-us" },
  ];

  const contactLinks = [
    {
      id: 1,
      name: "تلگرام",
      href: "https://t.me/omid_nk",
      icon: <LuSend className="size-4" />,
    },
    {
      id: 2,
      name: "لینکدین",
      href: "https://www.linkedin.com/in/omidnk/",
      icon: <LuLinkedin className="size-4" />,
    },
    {
      id: 3,
      name: "گیت‌هاب",
      href: "https://github.com/omid-nk",
      icon: <LuGithub className="size-4" />,
    },
    {
      id: 4,
      name: "ایمیل",
      href: "mailto:omiidnk02@gmail.com",
      icon: <LuMail className="size-4" />,
    },
  ];

  return (
    <footer className="mt-22">
      <section className="bg-dark text-light divide-border border-border mb-5 flex min-h-96 flex-col justify-between gap-2 rounded-xl p-3 select-none lg:flex-row lg:divide-x">
        <div className="flex w-full flex-col gap-8 pl-4">
          {/* Section 1 */}
          <section className="p-2">
            {/* Header */}
            <h3 className="mb-4 flex items-center gap-1 text-lg">
              <span className="text-primary">
                <LuChartNoAxesGantt />
              </span>
              درباره بالریون
              <span className="text-primary">
                <LuChartNoAxesGantt />
              </span>
            </h3>

            {/* Description */}
            <p className="text-light/60 text-base/loose">
              شروع هر چیزی سخت است، اما وقتی مسیر درستی را انتخاب کنی می‌توانی
              با خیال راحت رشد کنی. در بالریون کنار شما هستیم تا برنامه‌نویسی را
              به شکلی کاربردی و پروژه‌محور یاد بگیرید.
            </p>

            {/* Theme Toggle */}
            <ThemeToggle />
          </section>

          {/* Section 2 */}
          <section className="p-2">
            {/* Header */}
            <h3 className="mb-4 flex items-center gap-1 text-lg">
              <span className="text-primary">
                <LuChartNoAxesGantt />
              </span>
              لینک‌های مفید
              <span className="text-primary">
                <LuChartNoAxesGantt />
              </span>
            </h3>

            {/* Links */}
            <ul className="text-light/60 flex flex-col gap-2 px-2 text-base/relaxed">
              {importantLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    className="group flex items-center gap-1.5"
                    href={link.href}
                  >
                    <span className="group-hover:text-primary transition-all group-hover:pl-1">
                      <LuHexagon className="size-3" />
                    </span>

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="flex w-full flex-col gap-8 p-2">
          {/* Section 3 */}
          <section className="p-2">
            <Newsletter />
          </section>

          {/* Section 4 */}
          <section className="p-2">
            {/* Header */}
            <h3 className="mb-4 flex items-center gap-1 text-lg">
              <span className="text-primary">
                <LuChartNoAxesGantt />
              </span>
              ارتباط با ما
              <span className="text-primary">
                <LuChartNoAxesGantt />
              </span>
            </h3>

            {/* Contact Links */}
            <ul className="text-light/60 flex flex-col gap-2 px-2 text-base/relaxed">
              {contactLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    target="_blank"
                    className="group flex items-center gap-1.5"
                  >
                    <span className="group-hover:text-primary transition-all group-hover:pl-1">
                      {link.icon}
                    </span>

                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* NAMADS */}
            <div className="*:bg-light mt-10 flex flex-wrap items-center gap-2 *:w-18 *:rounded-lg *:p-2 *:sm:w-22 lg:justify-end">
              <Image
                src="/images/namads/namad-zibal.png"
                alt="NAMADS"
                width={100}
                height={100}
              />

              <Image
                src="/images/namads/namad-zarinpal.png"
                alt="NAMADS"
                width={100}
                height={100}
              />

              <Image
                src="/images/namads/e-namad.png"
                alt="NAMADS"
                width={100}
                height={100}
              />
            </div>
          </section>
        </div>
      </section>

      {/* Copyright */}
      <div className="dark:text-light/40 text-dark/80 mb-6 flex items-center justify-between px-4 text-sm select-none">
        <div className="flex items-center gap-1">
          <LuCopyright />

          <p className="pt-0.5">
            کلیه حقوق مادی و معنوی برای بالریون محفوظ است.
          </p>
        </div>

        <div>
          <p>
            Built with 💙 by{" "}
            <Link
              target="_blank"
              className="hover:text-primary hover:underline"
              href="https://omiddaliri.top/"
            >
              Omid Daliri
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
