import { createClient } from "@/lib/supabase/server";
import CourseGrid from "@/components/modules/courses/CourseGrid";

export default async function LastProducts() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <CourseGrid
      courses={courses || []}
      hasHeader={true}
      title="آخرین دوره‌ها"
      link="/courses"
    />
  );
}
