import { notFound } from "next/navigation";
import Image from "next/image";

import { getCourseBySlug } from "@/services/courses";

import Breadcrumb from "@/components/shared/Breadcrumb";
import ContentRenderer from "@/components/shared/ContentRenderer";

import { LuShoppingCart } from "react-icons/lu";
import {
  LuClock4,
  LuUsers,
  LuCalendarRange,
  LuChartColumn,
  LuAlignLeft,
} from "react-icons/lu";

export default async function Page({ params }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const hasDiscount =
    course.discount_price !== null && course.discount_price < course.price;

  const finalPrice = hasDiscount ? course.discount_price : course.price;

  const discountPercent = hasDiscount
    ? Math.round(((course.price - course.discount_price) / course.price) * 100)
    : 0;

  const courseStatus =
    course.completion_percent === 0
      ? "پیش‌فروش"
      : course.completion_percent === 100
        ? "تکمیل شده"
        : course.completion_percent !== null
          ? "در حال برگزاری"
          : "نامشخص";

  const infoCard = [
    {
      id: 1,
      name: "وضعیت دوره",
      icon: LuChartColumn,
      value: courseStatus,
    },
    {
      id: 2,
      name: "مدت زمان دوره",
      icon: LuCalendarRange,
      value: course.duration || "نامشخص",
    },
    {
      id: 3,
      name: "تعداد ثبت‌نامی",
      icon: LuUsers,
      value:
        course.student_count !== null
          ? `${course.student_count.toLocaleString("fa-IR")} نفر`
          : "نامشخص",
    },
    {
      id: 4,
      name: "بروزرسانی شده",
      icon: LuClock4,
      value: course.updated_at
        ? new Date(course.updated_at).toLocaleDateString("fa-IR")
        : "نامشخص",
    },
  ];

  return (
    <main className="min-w-0">
      {/* Hero */}
      <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
        {/* Course detail */}
        <div className="order-2 flex w-full min-w-0 flex-col gap-4 lg:order-1 lg:max-w-xl xl:max-w-2xl">
          <div className="min-w-0 overflow-hidden">
            <Breadcrumb
              items={[
                {
                  title: "خانه",
                  href: "/",
                },
                {
                  title: "دوره‌ها",
                  href: "/courses",
                },
                {
                  title: course.name,
                },
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
            <button className="bg-primary text-light flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm transition-all hover:brightness-95 sm:px-6">
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
                  {course.price.toLocaleString("fa-IR")} تومان
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="order-1 w-full overflow-hidden rounded-xl lg:order-2">
          <div className="relative aspect-video w-full">
            <Image
              src={course.cover_url}
              alt={course.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="mt-6 flex flex-col gap-4 sm:mt-8 xl:flex-row">
        {/* Course body */}
        <section className="w-full min-w-0">
          {/* Info cards */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {infoCard.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="bg-light dark:bg-dark flex min-w-0 flex-col gap-3 rounded-lg p-4 sm:gap-2 sm:p-5"
                >
                  <div className="text-primary flex min-w-0 items-center gap-2">
                    <Icon className="size-4 shrink-0 sm:size-5" />

                    <span className="text-dark/60 dark:text-light/60 truncate text-xs sm:text-sm">
                      {item.name}
                    </span>
                  </div>

                  <p className="text-dark dark:text-light truncate text-xs font-semibold sm:text-sm">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Content */}
          <article className="bg-light dark:bg-dark mt-4 rounded-lg p-4 sm:p-6">
            <header className="border-border font-morabba flex items-center gap-2 border-b px-1 pb-4 text-lg select-none sm:px-3 sm:text-xl">
              <LuAlignLeft className="text-primary size-5 shrink-0 sm:size-6" />
              <h2>توضیحات</h2>
            </header>

            <div className="min-w-0">
              <ContentRenderer content={course.content} />
            </div>
          </article>

          {/* Comments */}
          <section className="mt-4">{/* Comments */}</section>
        </section>

        {/* Sidebar */}
        <aside className="w-full xl:w-sm xl:shrink-0">{/* Sidebar */}</aside>
      </div>
    </main>
  );
}
