import Image from "next/image";
import Link from "next/link";

import { LuUsers } from "react-icons/lu";

import { getCourseCoverUrl } from "@/services/storage/course-covers";

export default function CourseCard({ course }) {
  const hasDiscount =
    course.price > 0 &&
    course.discount_price !== null &&
    course.discount_price < course.price;

  const finalPrice = hasDiscount ? course.discount_price : course.price;

  const discountPercent = hasDiscount
    ? Math.round(((course.price - course.discount_price) / course.price) * 100)
    : 0;

  const isFree = finalPrice === 0;

  const coverUrl = course.cover_url ? getCourseCoverUrl(course.cover_url) : "";

  return (
    <Link
      href={course.slug ? `/course/${course.slug}` : "#"}
      className="group border-border bg-light dark:bg-dark flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-300"
    >
      {/* Cover */}
      <div className="relative overflow-hidden">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={course.name ?? "دوره آموزشی"}
            width={1400}
            height={788}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="bg-border flex aspect-video w-full items-center justify-center">
            <span className="text-sm text-gray-400">بدون تصویر</span>
          </div>
        )}

        {/* Discount / Free Badge */}
        {isFree ? (
          <span className="bg-primary text-light absolute top-3 right-3 rounded-sm px-2.5 pt-1 pb-0.5 text-[10px]">
            رایگان
          </span>
        ) : hasDiscount ? (
          <span className="bg-primary text-light absolute top-3 right-3 rounded-sm px-2.5 pt-1 pb-0.5 text-[10px]">
            {discountPercent}٪ تخفیف
          </span>
        ) : null}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Title */}
          <h3 className="line-clamp-2 text-sm leading-6 font-bold sm:leading-7">
            {course.name ?? "بدون عنوان"}
          </h3>

          {/* Description */}
          <p className="text-dark/60 dark:text-light/60 line-clamp-3 text-[11px] leading-6 sm:text-xs sm:leading-6">
            {course.short_description ?? "توضیحی برای این دوره ثبت نشده است."}
          </p>
        </div>

        {/* Footer */}
        <div className="border-border border-t px-4 py-3.5">
          <div className="flex items-center justify-between gap-3">
            {/* Students */}
            <div className="text-dark/60 dark:text-light/60 flex items-center gap-1.5 text-[10px] sm:text-xs">
              <LuUsers className="text-primary text-base" />

              <span>
                {(course.student_count ?? 0).toLocaleString("fa-IR")} دانشجو
              </span>
            </div>

            {/* Price */}
            <div className="flex min-w-0 flex-col items-end">
              {course.price === null ? (
                <span className="text-xs">نامشخص</span>
              ) : isFree ? (
                <>
                  {course.price > 0 && (
                    <span className="text-dark/40 dark:text-light/40 text-[10px] line-through">
                      {course.price.toLocaleString("fa-IR")} تومان
                    </span>
                  )}

                  <span className="text-primary text-sm font-bold">رایگان</span>
                </>
              ) : hasDiscount ? (
                <>
                  <span className="text-dark/40 dark:text-light/40 text-[10px] line-through">
                    {course.price.toLocaleString("fa-IR")} تومان
                  </span>

                  <span className="text-sm font-bold">
                    {finalPrice.toLocaleString("fa-IR")} تومان
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold">
                  {course.price.toLocaleString("fa-IR")} تومان
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
