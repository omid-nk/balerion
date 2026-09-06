import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import CategoriesHeader from "@/components/course/CategoriesHeader";
import CourseGrid from "@/components/course/CourseGrid";
import ExpandableText from "@/components/shared/ExpandableText";

export default async function CategoriesPage({ params }) {
  const { slug } = await params;

  const supabase = await createClient();

  // دریافت دسته‌بندی
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  // دریافت دوره‌های مربوط به دسته‌بندی
  const { data: courseRelations, error: coursesError } = await supabase
    .from("course_categories")
    .select(
      `
      courses (*)
    `,
    )
    .eq("category_id", category.id);

  if (coursesError) {
    console.error(coursesError);
    return null;
  }

  // فقط دوره‌های فعال
  const courses = (courseRelations ?? [])
    .map((item) => item.courses)
    .filter((course) => course !== null)
    .filter((course) => course.status === "active");

  return (
    <main className="flex flex-col gap-12">
      {/* Category Header */}
      <CategoriesHeader category={category} />

      {/* Courses */}
      <section>
        <div className="mb-4">
          <p className="text-end">تعداد دوره‌ها: {courses.length}</p>
        </div>

        <CourseGrid courses={courses} hasHeader={false} />
      </section>

      {/* Category Content */}
      {category.content && (
        <section>
          <ExpandableText content={category.content} />
        </section>
      )}
    </main>
  );
}
