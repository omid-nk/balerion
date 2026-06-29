"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CoursesSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("title") || "");

  const onSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }

    router.push(`/courses?${params.toString()}`);
  };

  return (
    <form onSubmit={onSearch} className="mt-6 flex w-full max-w-md gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="جستجوی دوره..."
        className="w-full rounded-xl bg-white/10 px-4 py-2 text-sm outline-none"
      />

      <button className="bg-primary cursor-pointer rounded-xl px-4 text-sm">
        جستجو
      </button>
    </form>
  );
}
