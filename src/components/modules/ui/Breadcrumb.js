"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LuChevronLeft } from "react-icons/lu";

export default function Breadcrumb({ link1, title1, link2, title2 }) {
  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="breadcrumb">
      {/* Home */}
      <Link href="/" className="transition">
        خانه
      </Link>

      <Separator />

      {/* Level 1 */}
      <Link href={link1} className="relative transition">
        <span className="relative">{title1}</span>
      </Link>

      {/* Level 2 */}
      {title2 && (
        <>
          <Separator />

          <Link href={link2} className="font-medium">
            {title2}
          </Link>
        </>
      )}
    </nav>
  );
}

/* Separator */
function Separator() {
  return <LuChevronLeft size={14} className="" />;
}
