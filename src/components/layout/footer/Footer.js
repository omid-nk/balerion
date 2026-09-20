import Link from "next/link";

import { LuCopyright } from "react-icons/lu";

import Newsletter from "@/components/shared/Newsletter";

import FooterAbout from "./FooterAbout";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";

export default function Footer() {
  return (
    <footer className="mt-22">
      <section className="bg-dark text-light divide-border border-border mb-5 flex min-h-96 flex-col justify-between gap-2 rounded-xl p-3 select-none lg:flex-row lg:divide-x">
        <div className="flex w-full flex-col gap-8 pl-4">
          <FooterAbout />

          <FooterLinks />
        </div>

        <div className="flex w-full flex-col gap-8 p-2">
          <section className="p-2">
            <Newsletter />
          </section>

          <FooterContact />
        </div>
      </section>

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
              rel="noopener noreferrer"
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
