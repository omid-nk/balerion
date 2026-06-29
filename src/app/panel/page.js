import Link from "next/link";
import {
  LuBookOpen,
  LuClock3,
  LuBadgeCheck,
  LuArrowLeft,
  LuTvMinimalPlay,
} from "react-icons/lu";

export default function PanelPage() {
  const stats = [
    {
      title: "دوره‌های خریداری شده",
      value: 8,
      icon: LuBookOpen,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "دوره‌های تکمیل شده",
      value: 3,
      icon: LuBadgeCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "در حال یادگیری",
      value: 5,
      icon: LuTvMinimalPlay,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "ساعت آموزش",
      value: 42,
      icon: LuClock3,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const courses = [
    {
      title: "Next.js صفر تا صد",
      progress: 75,
    },
    {
      title: "Tailwind CSS",
      progress: 35,
    },
    {
      title: "React حرفه‌ای",
      progress: 15,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-8 text-white">
        <h1 className="text-3xl font-bold">سلام امید 👋</h1>

        <p className="mt-3 text-white/80">
          خوش اومدی. ادامه آموزش‌هات رو از اینجا مدیریت کن.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{item.title}</p>

                  <h3 className="mt-2 text-3xl font-bold">{item.value}</h3>
                </div>

                <div className={`rounded-2xl p-4 ${item.color}`}>
                  <Icon size={26} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">ادامه یادگیری</h2>

          <Link
            href="/panel/courses"
            className="flex items-center gap-2 text-primary"
          >
            مشاهده همه
            <LuArrowLeft />
          </Link>
        </div>

        <div className="space-y-5">
          {courses.map((course) => (
            <div key={course.title} className="rounded-2xl border p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">{course.title}</h3>

                <span className="text-sm text-gray-500">
                  {course.progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{
                    width: `${course.progress}%`,
                  }}
                />
              </div>

              <div className="mt-5">
                <button className="rounded-xl bg-primary px-5 py-2 text-sm text-white transition hover:opacity-90">
                  ادامه آموزش
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-3xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
        <h2 className="mb-5 text-xl font-bold">آخرین فعالیت‌ها</h2>

        <div className="space-y-4">
          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800">
            آخرین جلسه دوره Next.js را مشاهده کردید.
          </div>

          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800">
            دوره Tailwind CSS به حساب شما اضافه شد.
          </div>

          <div className="rounded-2xl bg-gray-50 p-4 dark:bg-zinc-800">
            اطلاعات پروفایل خود را بروزرسانی کردید.
          </div>
        </div>
      </div>
    </div>
  );
}
