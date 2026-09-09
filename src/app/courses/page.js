import CourseGrid from "@/components/course/CourseGrid";
import CoursesPageHeader from "@/components/course/CoursesPageHeader";
import { getCourses } from "@/services/courses";

export const metadata = {
  title: "همه دوره‌ها",
  description: "",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;

  const courses = await getCourses({
    type: params.type,
    title: params.title,
    sort: params.sort,
  });

  const headerTitle = params.title
    ? `نتایج جستجو برای "${params.title}"`
    : params.type === "free"
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
