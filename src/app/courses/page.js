import { createClient } from "@/lib/supabase/server";

import CoursesHeader from "@/components/modules/courses/CoursesHeader";
import CourseGrid from "@/components/modules/courses/CourseGrid";

export default async function CoursesPage({ searchParams }) {
  const supabase = await createClient();

  const params = await searchParams;

  const type = params?.type;
  const sort = params?.sort;
  const title = params?.title;

  let query = supabase.from("courses").select("*");

  if (type === "free") {
    query = query.eq("price", 0);
  }

  if (title) {
    query = query.ilike("name", `%${title}%`);
  }

  query = query.order("created_at", {
    ascending: sort === "oldest",
  });

  const { data: courses, error } = await query.limit(20);

  if (error) {
    console.log(error);
    return null;
  }

  const headerTitle = title
    ? `نتایج جستجو برای "${title}"`
    : type === "free"
      ? "دوره‌های رایگان"
      : "همه دوره‌ها";

  return (
    <>
      <CoursesHeader title={headerTitle} />
      <CourseGrid courses={courses} hasHeader={false} />
    </>
  );
}
