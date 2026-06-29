import CourseCard from "./CourseCard";
import CoursesListHeading from "./components/CoursesListHeading";

export default function CoursesList({ hasHeader, courses, link, title }) {
  const coursesData = courses;

  return (
    <>
      {coursesData.length > 0 ? (
        <>
          <section className="my-12">
            {hasHeader && <CoursesListHeading title={title} link={link} />}

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
              {coursesData.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <p className="my-12 text-center text-gray-500">هیچ دوره‌ای یافت نشد.</p>
      )}
    </>
  );
}
