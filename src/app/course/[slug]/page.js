import { notFound } from "next/navigation";

import { getCourseBySlug } from "@/services/courses";

import CourseHero from "@/components/courseDetail/CourseHero";
import CourseInfoCards from "@/components/courseDetail/CourseInfoCards";
import CourseContent from "@/components/courseDetail/CourseContent";
import CourseSidebar from "@/components/courseDetail/CourseSidebar";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  return {
    title: course?.name ?? "دوره آموزشی",
    description: course?.short_description ?? "مشاهده اطلاعات و توضیحات دوره",
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const completionPercent = Math.min(
    100,
    Math.max(0, course.completion_percent ?? 0),
  );

  const hasDiscount =
    course.price > 0 &&
    course.discount_price !== null &&
    course.discount_price < course.price;

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

  return (
    <main className="min-w-0 pb-24 xl:pb-0">
      <CourseHero
        course={course}
        hasDiscount={hasDiscount}
        finalPrice={finalPrice}
        discountPercent={discountPercent}
      />

      <div className="mt-6 flex flex-col gap-4 sm:mt-8 xl:flex-row">
        <section className="w-full min-w-0">
          <CourseInfoCards course={course} courseStatus={courseStatus} />

          <CourseContent content={course.content} />

          {/* Comments */}
          <section className="mt-4" />
        </section>

        <CourseSidebar
          course={course}
          completionPercent={completionPercent}
          hasDiscount={hasDiscount}
          finalPrice={finalPrice}
          discountPercent={discountPercent}
        />
      </div>
    </main>
  );
}
