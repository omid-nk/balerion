import Link from "next/link";
import Image from "next/image";

import { LuChartNoAxesGantt } from "react-icons/lu";

import { contactLinks } from "../../../data/footerItems";

export default function FooterContact() {
  return (
    <section className="p-2">
      <h3 className="mb-4 flex items-center gap-1 text-lg">
        <span className="text-primary">
          <LuChartNoAxesGantt />
        </span>
        ارتباط با ما
        <span className="text-primary">
          <LuChartNoAxesGantt />
        </span>
      </h3>

      <ul className="text-light/60 flex flex-col gap-2 px-2 text-base/relaxed">
        {contactLinks.map((link) => {
          const Icon = link.icon;

          return (
            <li key={link.id}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5"
              >
                <span className="group-hover:text-primary transition-all group-hover:pl-1">
                  <Icon className="size-4" />
                </span>

                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="*:bg-light mt-10 flex flex-wrap items-center gap-2 *:w-18 *:rounded-lg *:p-2 *:sm:w-22 lg:justify-end">
        <Image
          src="/images/namads/namad-zibal.png"
          alt="نماد زیبال"
          width={100}
          height={100}
        />

        <Image
          src="/images/namads/namad-zarinpal.png"
          alt="نماد زرین‌پال"
          width={100}
          height={100}
        />

        <Image
          src="/images/namads/e-namad.png"
          alt="ای‌نماد"
          width={100}
          height={100}
        />
      </div>
    </section>
  );
}
