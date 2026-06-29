import Image from "next/image";
import Link from "next/link";
import { LuUsers } from "react-icons/lu";

export default function CourseCard({ course }) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="border-dark/5 dark:border-light/5 group dark:bg-dark flex flex-1 flex-col justify-between rounded-xl border bg-white transition-all select-none"
    >
      {/* cover */}
      <div>
        <Image
          src={course.cover_url}
          alt={course.name}
          width={220}
          height={120}
          className="w-full rounded-t-xl rounded-b-4xl transition-all group-hover:brightness-140"
        />
      </div>

      {/* info section */}
      <div className="flex h-full flex-col justify-between">
        {/* top */}
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <div className="line-clamp-2 text-xs/relaxed font-bold sm:text-sm/loose">
            {course.name}
          </div>
          <div className="text-dark/60 dark:text-light/60 line-clamp-5 text-[10px] sm:line-clamp-4 sm:text-xs/relaxed">
            {course.short_description}
          </div>
        </div>

        {/* bot */}
        <div className="border-dark/10 dark:border-light/10 flex flex-wrap items-center justify-between gap-2 border-t p-4">
          <div className="flex items-center gap-1 text-xs">
            <LuUsers className="text-primary mb-1 text-base" />
            {course.student_count.toLocaleString()}
          </div>
          <div className="text-xs sm:text-sm">
            {course.price === 0
              ? `رایگان`
              : `${course.price.toLocaleString()} ت`}
          </div>
        </div>
      </div>
    </Link>
  );
}
