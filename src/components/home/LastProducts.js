import { createClient } from "@/lib/supabase/server";
import CourseGrid from "@/components/course/CourseGrid";

export default async function LastProducts() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error(error);
    return null;
  }

  return (
    <CourseGrid
      courses={courses}
      hasHeader
      title="آخرین دوره‌ها"
      link="/courses"
    />
  );
}
