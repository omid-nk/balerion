import { createClient } from "@/lib/supabase/server";

import CourseGrid from "@/components/course/CourseGrid";
import CoursesPageHeader from "@/components/course/CoursesPageHeader";

export default async function Page({ searchParams }) {
  const supabase = await createClient();

  const params = await searchParams;

  const type = params.type;
  const sort = params.sort;
  const title = params.title;

  let query = supabase.from("courses").select("*").eq("status", "active");

  // فقط دوره‌های رایگان
  if (type === "free") {
    query = query.eq("price", 0);
  }

  // جستجو بر اساس نام دوره
  if (title) {
    query = query.ilike("name", `%${title}%`);
  }

  // مرتب‌سازی
  query = query.order("created_at", {
    ascending: sort === "oldest",
  });

  const { data: courses, error } = await query.limit(20);

  if (error) {
    console.error(error);
    return null;
  }

  const headerTitle = title
    ? `نتایج جستجو برای "${title}"`
    : type === "free"
      ? "دوره‌های رایگان"
      : "همه دوره‌ها";

  return (
    <main className="flex flex-col gap-12">
      <CoursesPageHeader title={headerTitle} />

      <section>
        <div className="mb-4">
          <p className="text-end">تعداد دوره‌ها: {courses.length}</p>
        </div>

        <CourseGrid courses={courses} hasHeader={false} />
      </section>
    </main>
  );
}
