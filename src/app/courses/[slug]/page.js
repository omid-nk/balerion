import { notFound } from "next/navigation";

import CategoriesHeader from "@/components/course/CategoriesHeader";
import CourseGrid from "@/components/course/CourseGrid";
import ExpandableText from "@/components/shared/ExpandableText";

import { getCategoryBySlug, getCoursesByCategory } from "@/services/courses";

export default async function CategoriesPage({ params }) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const courses = await getCoursesByCategory(category.id);

  return (
    <main className="flex flex-col gap-12">
      <CategoriesHeader category={category} />

      <section>
        <div className="mb-4">
          <p className="text-end">تعداد دوره‌ها: {courses.length}</p>
        </div>

        <CourseGrid courses={courses} hasHeader={false} />
      </section>

      {category.content && (
        <section>
          <ExpandableText content={category.content} />
        </section>
      )}
    </main>
  );
}
