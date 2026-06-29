import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import CategoryHeader from "@/components/modules/courses/CategoryHeader";
import CourseGrid from "@/components/modules/courses/CourseGrid";
import CategoryDesc from "@/components/modules/courses/CategoryDesc";

export default async function CategoriesPage({ params, searchParams }) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (categoryError || !category) {
    notFound();
  }

  const { data: courseRelations, error } = await supabase
    .from("course_categories")
    .select(
      `
    courses (*)
  `,
    )
    .eq("category_id", category.id);

  const courses = courseRelations.map((item) => item.courses);

  return (
    <>
      <CategoryHeader category={category} />
      <CourseGrid courses={courses} hasHeader={false} />
      <CategoryDesc category={category} />
    </>
  );
}
