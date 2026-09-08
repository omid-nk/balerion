import { createClient } from "@/lib/supabase/server";
import CoursesHeader from "@/components/profile/courses/CoursesHeader";
import CoursesList from "@/components/profile/courses/CoursesList";

const PAGE_SIZE = 10;

export default async function CoursesPage() {
  const supabase = await createClient();

  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false })
    .range(0, PAGE_SIZE - 1);

  if (error) {
    console.error("Courses fetch error:", error);
  }

  return (
    <div>
      <CoursesHeader />

      <CoursesList initialCourses={courses || []} />
    </div>
  );
}
