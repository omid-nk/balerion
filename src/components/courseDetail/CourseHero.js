import Image from "next/image";
import Link from "next/link";
import { LuShoppingCart } from "react-icons/lu";

import Breadcrumb from "@/components/shared/Breadcrumb";

export default function CourseHero({
  course,
  hasDiscount,
  finalPrice,
  discountPercent,
}) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
      <div className="order-2 flex w-full min-w-0 flex-col gap-4 lg:order-1 lg:max-w-xl xl:max-w-2xl">
        <div className="min-w-0 overflow-hidden">
          <Breadcrumb
            items={[
              { title: "خانه", href: "/" },
              { title: "دوره‌ها", href: "/courses" },
              { title: course.name },
            ]}
          />
        </div>

        <h1 className="font-morabba text-xl leading-relaxed sm:text-2xl xl:text-3xl">
          {course.name}
        </h1>

        <p className="text-dark/80 dark:text-light/80 line-clamp-4 text-sm leading-7 sm:text-base">
          {course.short_description}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            className="bg-primary text-light flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm transition-all hover:brightness-95 sm:px-6"
          >
            <LuShoppingCart className="size-4" />
            افزودن به سبد خرید
          </button>

          <div className="min-w-fit">
            {course.price === 0 ? (
              <p className="text-base font-bold sm:text-lg">رایگان</p>
            ) : hasDiscount ? (
              <>
                <div className="flex items-center gap-2">
                  <p className="text-dark/60 dark:text-light/60 text-xs line-through sm:text-sm">
                    {course.price.toLocaleString("fa-IR")} تومان
                  </p>

                  <span className="bg-primary/10 text-primary rounded-md px-1.5 py-0.5 text-xs font-semibold">
                    {discountPercent}٪ تخفیف
                  </span>
                </div>

                <p className="mt-0.5 text-base font-bold sm:text-lg">
                  {finalPrice.toLocaleString("fa-IR")} تومان
                </p>
              </>
            ) : (
              <p className="text-base font-bold sm:text-lg">
                {course.price?.toLocaleString("fa-IR")} تومان
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="order-1 w-full overflow-hidden rounded-xl lg:order-2">
        <div className="relative aspect-video w-full">
          {course.cover_url ? (
            <Image
              src={course.cover_url}
              alt={course.name ?? "دوره آموزشی"}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="bg-border absolute inset-0 flex items-center justify-center">
              <span className="text-dark/40 dark:text-light/40 text-sm">
                بدون تصویر
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
