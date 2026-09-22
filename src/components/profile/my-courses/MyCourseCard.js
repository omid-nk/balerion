import { getCourseCoverUrl } from "@/services/storage/course-covers";

import { LuArrowLeft, LuClock3, LuUsers } from "react-icons/lu";

import Image from "next/image";
import Link from "next/link";

export default function MyCourseCard({ item }) {
  const course = item.course;

  const coverUrl = course.cover_url ? getCourseCoverUrl(course.cover_url) : "";

  return (
    <Link
      href={`/profile/learn/${course.slug}`}
      className="group flex w-full flex-col gap-3 py-5 first:pt-0 sm:flex-row sm:gap-5"
    >
      {/* Cover */}
      <div className="bg-border/20 relative aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:aspect-video sm:w-50 md:w-60 lg:w-70">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={course.name ?? "دوره آموزشی"}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 768px) 200px, (max-width: 1024px) 240px, 280px"
            className="object-cover"
          />
        ) : (
          <div className="bg-primary/10 text-primary flex size-full items-center justify-center text-xs">
            بدون تصویر
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col justify-between py-1 sm:py-2">
        <div>
          <h2 className="line-clamp-2 text-sm leading-6 font-bold sm:text-base">
            {course.name}
          </h2>

          {course.short_description && (
            <p className="text-dark/50 dark:text-light/50 mt-2 line-clamp-3 text-[11px] leading-5 sm:mt-3 sm:line-clamp-2 sm:text-xs">
              {course.short_description}
            </p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-dark/50 dark:text-light/50 flex items-center gap-3 text-[10px] sm:gap-4 sm:text-[11px]">
            {course.duration && (
              <div className="flex items-center gap-1.5">
                <LuClock3 size={14} />
                <span>{course.duration}</span>
              </div>
            )}

            {course.student_count !== null && (
              <div className="flex items-center gap-1.5">
                <LuUsers size={14} />
                <span>
                  {course.student_count.toLocaleString("fa-IR")} دانشجو
                </span>
              </div>
            )}
          </div>

          <div className="text-primary flex shrink-0 items-center gap-2 text-[11px] font-medium sm:text-xs">
            <span>مشاهده دوره</span>

            <LuArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
