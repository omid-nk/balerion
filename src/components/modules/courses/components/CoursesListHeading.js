import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";

export default function CoursesListHeading({ title, link }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-2 select-none sm:gap-4">
      <h2 className="font-morabba text-base font-bold sm:text-xl md:text-2xl/relaxed">
        {title}
      </h2>
      <span className="border-dark/20 dark:border-light/20 flex flex-1 border-t" />
      <Link
        className="text-light-gray dark:hover:text-light hover:text-dark flex items-center gap-1 py-1 text-xs transition-colors sm:text-sm/normal"
        href={link}
      >
        همه دوره‌ها
        <LuChevronLeft className="mb-1 text-xs" />
      </Link>
    </header>
  );
}
