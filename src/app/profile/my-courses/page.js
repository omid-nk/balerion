import MyCourseCard from "@/components/profile/my-courses/MyCourseCard";

import { getMyCourses } from "@/services/enrollments/get-my-courses";

export default async function MyCoursesPage() {
  const courses = await getMyCourses();

  return (
    <section>
      <div className="border-border mb-6 border-b pb-6 select-none">
        <h1 className="text-xl font-bold">دوره‌های من</h1>

        <p className="text-dark/50 dark:text-light/50 mt-2 text-sm">
          دوره‌هایی که در آن‌ها ثبت‌نام کرده‌اید را اینجا مشاهده و ادامه دهید
        </p>
      </div>

      {courses.length > 0 ? (
        <div className="divide-border flex flex-col divide-y">
          {courses.map((item) => (
            <MyCourseCard key={item.enrollmentId} item={item} />
          ))}
        </div>
      ) : (
        <div className="border-border bg-border/10 flex min-h-60 items-center justify-center rounded-xl border border-dashed">
          <div className="text-center">
            <p className="text-sm font-medium">
              هنوز در دوره‌ای ثبت‌نام نکرده‌اید
            </p>

            <p className="text-dark/50 dark:text-light/50 mt-2 text-xs">
              با انتخاب یک دوره می‌توانید یادگیری خود را شروع کنید
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
