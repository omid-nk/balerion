import Image from "next/image";
import Link from "next/link";

import { LuUsers } from "react-icons/lu";

export default function CourseCard({ course }) {
  return (
    <Link
      href={course.slug ? `/course/${course.slug}` : "#"}
      className="border-border group dark:bg-dark bg-light flex flex-1 flex-col justify-between rounded-xl border transition-all select-none"
    >
      {/* Cover */}
      <div>
        {course.cover_url ? (
          <Image
            src={course.cover_url}
            alt={course.name ?? "دوره آموزشی"}
            width={1400}
            height={1000}
            className="w-full rounded-t-xl rounded-b-4xl transition-all group-hover:brightness-120"
          />
        ) : (
          <div className="flex aspect-14/10 items-center justify-center rounded-t-xl rounded-b-4xl bg-gray-100 dark:bg-gray-800">
            <span className="text-sm text-gray-400">بدون تصویر </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex h-full flex-col justify-between">
        {/* Top */}
        <div className="flex flex-col gap-2 p-3 sm:p-4">
          <div className="line-clamp-2 text-xs/relaxed font-bold sm:text-sm/loose">
            {course.name ?? "بدون عنوان"}
          </div>

          <div className="text-dark/60 dark:text-light/60 line-clamp-5 text-[10px] sm:line-clamp-4 sm:text-xs/relaxed">
            {course.short_description ?? "توضیحی برای این دوره ثبت نشده است."}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-border flex flex-wrap items-center justify-between gap-2 border-t p-4">
          <div className="flex items-center gap-1.5 text-xs">
            <LuUsers className="text-primary/80 mb-1 text-base" />

            {(course.student_count ?? 0).toLocaleString()}
          </div>

          <div className="text-xs sm:text-sm">
            {course.price === 0
              ? "رایگان"
              : course.price !== null
                ? `${course.price.toLocaleString()} ت`
                : "نامشخص"}
          </div>
        </div>
      </div>
    </Link>
  );
}
