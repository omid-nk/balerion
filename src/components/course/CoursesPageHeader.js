"use client";

import SearchBar from "@/components/shared/SearchBar";

import Breadcrumb from "@/components/shared/Breadcrumb";

import CoursesPageFilters from "./CoursesPageFilters";

export default function CoursesPageHeader({ title }) {
  return (
    <header className="from-dark via-dark/95 to-dark text-light border-border relative flex flex-col items-center justify-center overflow-hidden rounded-xl border bg-linear-to-b px-4 py-6 sm:px-6 sm:py-14 md:py-16">
      {/* Glow */}
      <div className="bg-primary/15 absolute -top-16 left-1/2 size-48 -translate-x-1/2 rounded-full blur-3xl sm:-top-20 sm:size-72" />

      <div className="bg-primary/15 absolute -right-10 -bottom-16 size-48 rounded-full blur-3xl sm:right-10 sm:-bottom-24 sm:size-72" />

      {/* Breadcrumb */}
      <div className="relative mb-4 flex w-full items-center justify-center self-start md:absolute md:top-6 md:right-6 md:mb-0 md:w-fit">
        <div className="bg-light dark:bg-dark rounded-full px-3 py-1 sm:px-4">
          <Breadcrumb
            items={[
              {
                title: "خانه",
                href: "/",
              },
              {
                title: "دوره‌ها",
              },
            ]}
          />
        </div>
      </div>

      {/* Title */}
      <h1 className="relative max-w-full text-center text-3xl leading-tight font-extrabold sm:text-4xl md:max-w-3xl md:text-5xl">
        {title}
      </h1>

      {/* Description */}
      <p className="text-light/60 relative mt-3 text-center text-xs sm:text-sm">
        جستجو و فیلتر بین دوره‌های آموزشی
      </p>

      {/* Search */}
      <div className="relative mt-4 w-full max-w-md sm:mt-6">
        <SearchBar variant="simple" />
      </div>

      {/* Filters */}
      <div className="relative w-full">
        <CoursesPageFilters />
      </div>
    </header>
  );
}
