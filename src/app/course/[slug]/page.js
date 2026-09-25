import { notFound } from "next/navigation";

import { getCourseBySlug } from "@/services/courses/courses";
import { getCourseComments } from "@/services/comments/comments";

import CourseHero from "@/components/courseDetail/CourseHero";
import CourseInfoCards from "@/components/courseDetail/CourseInfoCards";
import CourseContent from "@/components/courseDetail/CourseContent";
import CourseSidebar from "@/components/courseDetail/CourseSidebar";
import CommentsSection from "@/components/comments/CommentsSection";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  return {
    title: course?.name ?? "دوره آموزشی",
    description: course?.short_description ?? "مشاهده اطلاعات و توضیحات دوره",
  };
}

export default async function Page({ params, searchParams }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const query = await searchParams;

  const page = Math.max(1, Number(query?.page) || 1);

  const commentsResult = await getCourseComments(course.id, {
    page,
    pageSize: 10,
  });

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

          <CommentsSection
            comments={commentsResult.comments}
            courseId={course.id}
            page={commentsResult.page}
            totalPages={commentsResult.totalPages}
            total={commentsResult.total}
          />
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
