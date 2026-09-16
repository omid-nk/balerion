import TitleHeading from "../shared/TitleHeading";
import CourseCard from "./CourseCard";

export default function CoursesGrid({
  hasHeader = false,
  courses,
  link,
  title,
}) {
  return (
    <>
      {courses.length > 0 ? (
        <section>
          {hasHeader && <TitleHeading title={title ?? ""} linkHref={link} />}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      ) : (
        <p className="my-12 text-center text-gray-500">هیچ دوره‌ای یافت نشد.</p>
      )}
    </>
  );
}
