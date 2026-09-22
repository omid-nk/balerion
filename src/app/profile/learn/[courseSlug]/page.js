import Link from "next/link";
import Image from "next/image";
import {
  LuArrowRight,
  LuBookOpen,
  LuClock3,
  LuPlay,
  LuUsers,
} from "react-icons/lu";

import { getCourseCoverUrl } from "@/services/storage/course-covers";
import { getCourseCurriculum } from "@/services/learning/get-course-curriculum";
import CourseCurriculum from "@/components/profile/learn/CourseCurriculum";

export default async function LearnCoursePage({ params }) {
  const { courseSlug } = await params;

  const data = await getCourseCurriculum(courseSlug);

  if (!data) {
    return (
      <div className="border-border flex min-h-72 items-center justify-center rounded-xl border border-dashed px-4">
        <div className="text-center">
          <p className="text-sm font-medium">دوره مورد نظر پیدا نشد</p>

          <Link
            href="/profile/my-courses"
            className="text-primary mt-3 inline-flex text-xs"
          >
            بازگشت به دوره‌های من
          </Link>
        </div>
      </div>
    );
  }

  const { course, sections } = data;

  const totalLessons = sections.reduce(
    (total, section) => total + section.course_lessons.length,
    0,
  );

  const coverUrl = course.cover_url ? getCourseCoverUrl(course.cover_url) : "";

  return (
    <section className="space-y-5 sm:space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/profile/my-courses"
          className="text-dark/40 dark:text-light/40 hover:bg-primary/10 hover:text-primary flex size-9 shrink-0 items-center justify-center rounded-xl transition"
        >
          <LuArrowRight size={17} />
        </Link>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold sm:text-lg">
            {course.name}
          </h1>

          <p className="text-dark/40 dark:text-light/40 mt-1 text-[10px] sm:text-xs">
            محیط یادگیری دوره
          </p>
        </div>
      </div>

      {/* Course Info */}
      <div className="border-border overflow-hidden rounded-xl border">
        <div className="flex flex-col gap-3 p-3.5 sm:gap-5 sm:p-5 md:flex-row">
          {/* Cover */}
          <div className="bg-border/20 relative aspect-video w-full shrink-0 overflow-hidden rounded-lg md:w-52">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={course.name}
                fill
                sizes="(max-width: 639px) 112px, 208px"
                className="object-cover"
              />
            ) : (
              <div className="bg-primary/10 text-primary flex size-full items-center justify-center text-[9px]">
                بدون تصویر
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div className="min-w-0">
              <h2 className="line-clamp-2 text-xs leading-5 font-bold sm:text-base sm:leading-6">
                {course.name}
              </h2>

              {course.short_description && (
                <p className="text-dark/50 dark:text-light/50 mt-1.5 line-clamp-2 text-[9px] leading-4 sm:mt-2 sm:text-xs sm:leading-6">
                  {course.short_description}
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="text-dark/50 dark:text-light/50 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[9px] sm:mt-5 sm:gap-x-5 sm:text-[11px]">
              <div className="flex items-center gap-1">
                <LuBookOpen size={12} />
                <span>{sections.length} بخش</span>
              </div>

              <div className="flex items-center gap-1">
                <LuPlay size={12} />
                <span>{totalLessons} درس</span>
              </div>

              {course.duration && (
                <div className="flex items-center gap-1">
                  <LuClock3 size={12} />
                  <span>{course.duration}</span>
                </div>
              )}

              {course.student_count !== null && (
                <div className="flex items-center gap-1">
                  <LuUsers size={12} />
                  <span>
                    {course.student_count.toLocaleString("fa-IR")} دانشجو
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <CourseCurriculum course={course} sections={sections} />
    </section>
  );
}
