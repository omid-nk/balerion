"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function CoursesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/courses?${params.toString()}`);
  };

  const type = searchParams.get("type");
  const sort = searchParams.get("sort");

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-2 *:cursor-pointer">
      <button
        onClick={() => setFilter("type", "")}
        className={`rounded-lg px-3 py-1 text-sm ${
          !type ? "bg-primary" : "bg-white/10"
        }`}
      >
        همه
      </button>

      <button
        onClick={() => setFilter("type", "free")}
        className={`rounded-lg px-3 py-1 text-sm ${
          type === "free" ? "bg-primary" : "bg-white/10"
        }`}
      >
        رایگان
      </button>

      <button
        onClick={() => setFilter("sort", "newest")}
        className={`rounded-lg px-3 py-1 text-sm ${
          sort !== "oldest" ? "bg-primary" : "bg-white/10"
        }`}
      >
        جدیدترین
      </button>

      <button
        onClick={() => setFilter("sort", "oldest")}
        className={`rounded-lg px-3 py-1 text-sm ${
          sort === "oldest" ? "bg-primary" : "bg-white/10"
        }`}
      >
        قدیمی‌ترین
      </button>
    </div>
  );
}
