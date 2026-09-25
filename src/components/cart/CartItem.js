"use client";

import Image from "next/image";
import Link from "next/link";
import { LuClock3, LuTrash2, LuUsers } from "react-icons/lu";

import { removeFromCart } from "@/lib/cart";
import { getCourseCoverUrl } from "@/services/storage/course-covers";

function formatPrice(price) {
  return new Intl.NumberFormat("fa-IR").format(price);
}

export default function CartItem({ course, onRemove }) {
  const coverUrl = course.cover_url ? getCourseCoverUrl(course.cover_url) : "";

  const price = Number(course.price) || 0;

  const discountPrice =
    course.discount_price !== null ? Number(course.discount_price) : null;

  const hasDiscount =
    price > 0 && discountPrice !== null && discountPrice < price;

  const finalPrice = hasDiscount ? discountPrice : price;

  const discountPercent = hasDiscount
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  function handleRemove() {
    removeFromCart(course.id);
    onRemove?.();
  }

  return (
    <article className="border-dark/10 bg-light dark:border-light/10 dark:bg-dark flex flex-col gap-4 rounded-xl border p-3 sm:flex-row sm:p-4">
      <Link
        href={`/course/${course.slug}`}
        className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-lg sm:w-48"
      >
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={course.name ?? "دوره آموزشی"}
            fill
            sizes="(max-width: 640px) 100vw, 192px"
            className="object-cover"
          />
        ) : (
          <div className="bg-primary/10 text-primary flex size-full items-center justify-center text-xs">
            بدون تصویر
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <Link
            href={`/course/${course.slug}`}
            className="hover:text-primary line-clamp-2 min-w-0 text-sm font-bold transition-colors sm:text-base"
          >
            {course.name}
          </Link>

          <button
            type="button"
            onClick={handleRemove}
            aria-label="حذف دوره"
            className="text-dark/40 hover:bg-alert/10 hover:text-alert dark:text-light/40 flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors sm:size-9"
          >
            <LuTrash2 size={17} />
          </button>
        </div>

        <div className="text-dark/50 dark:text-light/50 mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:gap-x-4">
          {course.duration && (
            <span className="flex items-center gap-1.5">
              <LuClock3 size={14} />
              {course.duration}
            </span>
          )}

          {course.student_count !== null && (
            <span className="flex items-center gap-1.5">
              <LuUsers size={14} />
              {formatPrice(course.student_count)}
              دانشجو
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {hasDiscount && (
              <>
                <span className="bg-alert/10 text-alert rounded-md px-1.5 py-1 text-[10px] font-bold">
                  {formatPrice(discountPercent)}٪ تخفیف
                </span>

                <span className="text-dark/40 dark:text-light/40 text-xs line-through">
                  {formatPrice(price)}
                </span>
              </>
            )}
          </div>

          <div className="shrink-0">
            {finalPrice === 0 ? (
              <span className="text-primary text-sm font-bold">رایگان</span>
            ) : (
              <span className="text-sm font-bold">
                {formatPrice(finalPrice)}

                <span className="text-dark/40 dark:text-light/40 mr-1 text-[10px] font-normal">
                  تومان
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
