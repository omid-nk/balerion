"use client";

import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const searchBtnHandler = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      return;
    } else {
      const queryParams = new URLSearchParams();
      queryParams.append("title", search);
      const newUrl = `/courses?${queryParams.toString()}`;
      router.push(newUrl);
    }
  };

  return (
    <form
      onSubmit={searchBtnHandler}
      className="border-primary/20 dark:bg-dark relative my-0.5 flex items-center justify-between gap-4 rounded-xl border bg-white py-2.5 pr-5 pl-2.5 sm:my-2"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="text-dark dark:text-light dark:placeholder:text-light/40 placeholder:text-dark/60 w-full outline-0"
        placeholder="دنبال چه دوره ای میگردی؟"
      />
      <button
        type="submit"
        aria-label="جستجو"
        className="bg-primary/15 border-dark/10 dark:border-primary-dark text-primary dark:shadow-primary-dark/30 flex size-10 cursor-pointer items-center justify-center rounded-lg border px-2.5 transition-all duration-200 hover:shadow-md sm:size-12"
      >
        <LuSearch className="text-lg" />
      </button>
    </form>
  );
}
