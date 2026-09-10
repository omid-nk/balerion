import {
  LuClock4,
  LuUsers,
  LuCalendarRange,
  LuChartColumn,
} from "react-icons/lu";

const icons = {
  status: LuChartColumn,
  duration: LuCalendarRange,
  students: LuUsers,
  updated: LuClock4,
};

export default function CourseInfoCards({ course, courseStatus }) {
  const infoCards = [
    {
      id: "status",
      name: "وضعیت دوره",
      value: courseStatus,
    },
    {
      id: "duration",
      name: "مدت زمان دوره",
      value: course.duration || "نامشخص",
    },
    {
      id: "students",
      name: "تعداد ثبت‌نامی",
      value:
        course.student_count !== null
          ? `${course.student_count.toLocaleString("fa-IR")} نفر`
          : "نامشخص",
    },
    {
      id: "updated",
      name: "بروزرسانی شده",
      value: course.updated_at
        ? new Date(course.updated_at).toLocaleDateString("fa-IR")
        : "نامشخص",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {infoCards.map((item) => {
        const Icon = icons[item.id];

        return (
          <div
            key={item.id}
            className="bg-light dark:bg-dark flex min-w-0 flex-col gap-3 rounded-lg p-4 sm:gap-2 sm:p-5"
          >
            <div className="text-primary flex min-w-0 items-center gap-2">
              <Icon className="size-4 shrink-0 sm:size-5" />

              <span className="text-dark/60 dark:text-light/60 truncate text-xs sm:text-sm">
                {item.name}
              </span>
            </div>

            <p className="text-dark dark:text-light truncate text-xs font-semibold sm:text-sm">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}
