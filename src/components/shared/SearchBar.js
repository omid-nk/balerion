"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LuSearch } from "react-icons/lu";

export default function SearchBar({ variant = "default" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("title") || "");

  const searchBtnHandler = (e) => {
    e.preventDefault();

    const value = search.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("title", value);
    } else {
      params.delete("title");
    }

    const query = params.toString();

    router.push(query ? `/courses?${query}` : "/courses");
  };

  if (variant === "simple") {
    return (
      <form
        onSubmit={searchBtnHandler}
        className="mt-4 flex w-full max-w-md gap-2 sm:mt-6"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="جستجوی دوره..."
          className="focus:ring-primary/40 min-w-0 flex-1 rounded-xl bg-white/10 px-3 py-2.5 text-xs transition outline-none placeholder:text-white/40 focus:ring-1 sm:px-4 sm:py-3 sm:text-sm"
        />

        <button
          type="submit"
          className="bg-primary hover:bg-primary/90 shrink-0 cursor-pointer rounded-xl px-3 py-2.5 text-xs transition active:scale-95 sm:px-5 sm:py-3 sm:text-sm"
        >
          جستجو
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={searchBtnHandler}
      className="border-primary/20 bg-light dark:bg-dark relative my-0.5 flex w-full items-center gap-2 rounded-xl border py-2 pr-3 pl-2 sm:my-2 sm:gap-4 sm:py-2.5 sm:pr-5 sm:pl-2.5"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-dark dark:text-light dark:placeholder:text-light/40 placeholder:text-dark/60 min-w-0 flex-1 text-xs outline-0 sm:text-sm"
        placeholder="دنبال چه دوره‌ای می‌گردی؟"
      />

      <button
        type="submit"
        aria-label="جستجو"
        className="bg-primary/15 border-dark/10 text-primary flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-all duration-200 hover:shadow-md active:scale-95 sm:size-12"
      >
        <LuSearch className="text-base sm:text-lg" />
      </button>
    </form>
  );
}
