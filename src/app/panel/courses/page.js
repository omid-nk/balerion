import Image from "next/image";
import Link from "next/link";
import {
  LuSearch,
  LuClock3,
  LuTvMinimalPlay,
  LuBadgeCheck,
} from "react-icons/lu";

export default function CoursesPage() {
  const courses = [
    {
      id: 1,
      title: "آموزش Next.js",
      teacher: "امید دلیری",
      image: "/images/course.jpg",
      progress: 75,
      lessons: 48,
      duration: "18 ساعت",
      completed: false,
    },
    {
      id: 2,
      title: "React حرفه‌ای",
      teacher: "امید دلیری",
      image: "/images/course.jpg",
      progress: 100,
      lessons: 36,
      duration: "12 ساعت",
      completed: true,
    },
    {
      id: 3,
      title: "Tailwind CSS",
      teacher: "امید دلیری",
      image: "/images/course.jpg",
      progress: 22,
      lessons: 20,
      duration: "7 ساعت",
      completed: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">دوره‌های من</h1>

          <p className="mt-2 text-gray-500">
            تمام دوره‌های خریداری شده و میزان پیشرفت آن‌ها.
          </p>
        </div>

        <div className="relative w-full lg:w-80">
          <LuSearch
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="جستجو در دوره‌ها..."
            className="w-full rounded-2xl border py-3 pr-11 pl-4 outline-none transition focus:border-primary"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <button className="rounded-full bg-primary px-5 py-2 text-white">
          همه
        </button>

        <button className="rounded-full border px-5 py-2 hover:border-primary">
          در حال یادگیری
        </button>

        <button className="rounded-full border px-5 py-2 hover:border-primary">
          تکمیل شده
        </button>
      </div>

      {/* Courses */}
      <div className="grid gap-6 lg:grid-cols-2">
        {courses.map((course) => (
          <div
            key={course.id}
            className="overflow-hidden rounded-3xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900"
          >
            <div className="relative h-52">
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
              />

              {course.completed ? (
                <span className="absolute left-4 top-4 rounded-full bg-green-600 px-4 py-1 text-sm text-white">
                  تکمیل شده
                </span>
              ) : (
                <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1 text-sm text-white">
                  در حال یادگیری
                </span>
              )}
            </div>

            <div className="space-y-5 p-6">
              <div>
                <h2 className="text-xl font-bold">{course.title}</h2>

                <p className="mt-1 text-sm text-gray-500">
                  مدرس: {course.teacher}
                </p>
              </div>

              <div className="flex gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <LuTvMinimalPlay />
                  {course.lessons} جلسه
                </div>

                <div className="flex items-center gap-2">
                  <LuClock3 />

                  {course.duration}
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>پیشرفت دوره</span>

                  <span>{course.progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${course.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                {course.completed ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <LuBadgeCheck />
                    پایان دوره
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    آخرین جلسه: قسمت ۱۲
                  </span>
                )}

                <Link
                  href={`/course/${course.id}`}
                  className="rounded-xl bg-primary px-5 py-2 text-white transition hover:opacity-90"
                >
                  {course.completed ? "مشاهده دوره" : "ادامه آموزش"}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
