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
        <section className="">
          {hasHeader && <TitleHeading title={title ?? ""} linkHref={link} />}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 xl:grid-cols-4 xl:gap-5">
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
