import CreateCourseForm from "@/components/profile/courses/CreateCourseForm";

export default function page() {
  return (
    <div className="">
      <header className="border-border mb-6 flex flex-col gap-4 border-b pb-6 select-none sm:flex-row sm:items-center sm:justify-between">
        <div className="select-none">
          <h1 className="text-xl font-bold">ساخت دوره جدید</h1>

          <p className="text-dark/50 dark:text-light/50 mt-2 text-sm">
            اطلاعات دوره جدید را وارد کنید و دوره را ایجاد کنید.
          </p>
        </div>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            type="submit"
            form="create-course-form"
            name="action"
            value="draft"
            className="border-border bg-light dark:bg-dark hover:bg-dark/5 dark:hover:bg-light/5 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all active:scale-[0.98] sm:w-auto"
          >
            ذخیره پیش‌نویس
          </button>

          <button
            type="submit"
            form="create-course-form"
            name="action"
            value="publish"
            className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white transition-all active:scale-[0.98] sm:w-auto"
          >
            انتشار
          </button>
        </div>
      </header>

      <CreateCourseForm />
    </div>
  );
}
