import Link from "next/link";

import { LuChartNoAxesGantt, LuHexagon } from "react-icons/lu";

import { importantLinks } from "../../../data/footerItems";

export default function FooterLinks() {
  return (
    <section className="p-2">
      <h3 className="mb-4 flex items-center gap-1 text-lg">
        <span className="text-primary">
          <LuChartNoAxesGantt />
        </span>
        لینک‌های مفید
        <span className="text-primary">
          <LuChartNoAxesGantt />
        </span>
      </h3>

      <ul className="text-light/60 flex flex-col gap-2 px-2 text-base/relaxed">
        {importantLinks.map((link) => (
          <li key={link.id}>
            <Link className="group flex items-center gap-1.5" href={link.href}>
              <span className="group-hover:text-primary transition-all group-hover:pl-1">
                <LuHexagon className="size-3" />
              </span>

              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
