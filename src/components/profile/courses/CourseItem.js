import Image from "next/image";
import Link from "next/link";
import { LuPencil } from "react-icons/lu";
import { getCourseCoverUrl } from "@/services/storage/course-covers";

export default function CourseItem({ course }) {
  const coverUrl = course.cover_url ? getCourseCoverUrl(course.cover_url) : "";

  return (
    <div className="border-border flex flex-col gap-4 rounded-2xl border p-4 transition-colors hover:bg-black/[0.02] sm:flex-row sm:items-center dark:hover:bg-white/[0.02]">
      {/* Course Image */}
      <div className="bg-dark/5 dark:bg-light/5 relative aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-40">
        {course.cover_url ? (
          <Image
            src={coverUrl}
            alt={course.name}
            fill
            sizes="160px"
            className="object-cover"
          />
        ) : (
          <div className="text-dark/30 dark:text-light/30 flex size-full items-center justify-center text-xs">
            بدون تصویر
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h2 className="truncate font-bold">{course.name}</h2>

        {course.slug && (
          <p
            dir="ltr"
            className="text-dark/40 dark:text-light/40 mt-1 truncate text-xs"
          >
            /{course.slug}
          </p>
        )}

        <div className="text-dark/40 dark:text-light/40 mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span>{course.price === 0 ? "رایگان" : `${course.price} تومان`}</span>

          {course.created_at && (
            <span>
              {new Date(course.created_at).toLocaleDateString("fa-IR")}
            </span>
          )}
        </div>
      </div>

      {/* Edit */}
      <Link
        href={`/profile/courses/${course.slug}`}
        className="border-border hover:border-primary hover:text-primary flex shrink-0 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all active:scale-[0.98]"
      >
        <LuPencil className="size-4" />
        ویرایش
      </Link>
    </div>
  );
}
