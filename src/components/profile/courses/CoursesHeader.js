import Link from "next/link";
import { LuPlus } from "react-icons/lu";

export default function CoursesHeader() {
  return (
    <div className="border-border mb-6 flex flex-col gap-4 border-b pb-6 select-none sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold">دوره‌ها</h1>

        <p className="text-dark/50 dark:text-light/50 mt-2 text-sm">
          تمام دوره‌های سایت را مدیریت کنید.
        </p>
      </div>

      <Link
        href="/profile/courses/new-course"
        className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all active:scale-[0.98] sm:w-auto"
      >
        <LuPlus className="size-5" />
        افزودن دوره جدید
      </Link>
    </div>
  );
}
