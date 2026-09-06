import { createClient } from "@/lib/supabase/server";
import CourseGrid from "@/components/course/CourseGrid";

export default async function FreeProducts() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "active")
    .eq("price", 0)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <CourseGrid
      courses={courses}
      hasHeader
      title="دوره‌های رایگان"
      link="/courses?type=free"
    />
  );
}
