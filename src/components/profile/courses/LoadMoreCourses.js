"use client";

import { LuLoaderCircle } from "react-icons/lu";

export default function LoadMoreCourses({ loading, onClick }) {
  return (
    <div className="mt-6 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="border-border hover:border-primary hover:text-primary flex min-w-40 items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium transition-all active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
      >
        {loading ? (
          <>
            <LuLoaderCircle className="size-5 animate-spin" />
            در حال دریافت...
          </>
        ) : (
          "نمایش دوره‌های بیشتر"
        )}
      </button>
    </div>
  );
}
