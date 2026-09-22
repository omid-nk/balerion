"use client";

import { useState } from "react";
import Link from "next/link";
import { LuChevronDown, LuArrowRight, LuClock3, LuPlay } from "react-icons/lu";

export default function CourseCurriculum({ course, sections }) {
  const [openSection, setOpenSection] = useState(sections[0]?.id ?? null);

  const totalLessons = sections.reduce(
    (total, section) => total + section.course_lessons.length,
    0,
  );

  return (
    <div>
      {/* Heading */}
      <div className="mb-3 flex items-end justify-between gap-3 sm:mb-4">
        <div className="min-w-0">
          <h2 className="text-sm font-bold sm:text-base">محتوای دوره</h2>

          <p className="text-dark/50 dark:text-light/50 mt-1 text-[10px] sm:text-[11px]">
            سرفصل‌ها و درس‌های دوره
          </p>
        </div>

        <span className="text-dark/50 dark:text-light/50 shrink-0 text-[10px] sm:text-xs">
          {totalLessons} درس
        </span>
      </div>

      {/* Sections */}
      <div className="border-border overflow-hidden rounded-xl border">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          const lessonCount = section.course_lessons.length;

          return (
            <div
              key={section.id}
              className="border-border border-b last:border-b-0"
            >
              {/* Section Header */}
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : section.id)}
                className="hover:bg-border/5 flex w-full items-center gap-2.5 px-3 py-3.5 text-right transition sm:gap-3 sm:px-5 sm:py-4"
              >
                {/* Section Number */}
                <span className="bg-primary/10 text-primary flex size-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold sm:size-9 sm:text-xs">
                  {String(section.position).padStart(2, "0")}
                </span>

                {/* Section Info */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs font-bold sm:text-sm">
                    {section.title}
                  </h3>

                  <p className="text-dark/40 dark:text-light/40 mt-0.5 text-[9px] sm:mt-1 sm:text-[10px]">
                    {lessonCount} درس
                  </p>
                </div>

                {/* Arrow */}
                <span
                  className={`text-dark/40 dark:text-light/40 flex size-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 sm:size-8 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <LuChevronDown size={16} />
                </span>
              </button>

              {/* Lessons */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-border border-t">
                    {section.course_lessons.length > 0 ? (
                      section.course_lessons.map((lesson, index) => (
                        <Link
                          key={lesson.id}
                          href={`/profile/learn/${course.slug}/${lesson.slug}`}
                          className="group border-border/60 flex min-w-0 items-center gap-2 border-b px-3 py-3 last:border-b-0 sm:gap-3 sm:px-5 sm:py-3.5"
                        >
                          {/* Lesson Number */}
                          <span className="text-dark/30 dark:text-light/30 w-5 shrink-0 text-center text-[9px] sm:w-7 sm:text-[10px]">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          {/* Play Icon */}
                          <span className="bg-border/20 text-dark/50 dark:text-light/50 group-hover:bg-primary/10 group-hover:text-primary flex size-7 shrink-0 items-center justify-center rounded-md transition sm:size-8 sm:rounded-lg">
                            <LuPlay size={12} className="sm:size-3.25" />
                          </span>

                          {/* Lesson Info */}
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[11px] font-medium sm:text-xs">
                              {lesson.title}
                            </p>

                            {lesson.duration !== null && (
                              <div className="text-dark/40 dark:text-light/40 mt-0.5 flex items-center gap-1 text-[9px] sm:mt-1 sm:text-[10px]">
                                <LuClock3 size={10} />
                                <span>{lesson.duration} دقیقه</span>
                              </div>
                            )}
                          </div>

                          {/* Preview */}
                          {lesson.is_preview && (
                            <span className="text-primary bg-primary/10 shrink-0 rounded-md px-1.5 py-1 text-[8px] sm:px-2 sm:text-[9px]">
                              پیش‌نمایش
                            </span>
                          )}
                        </Link>
                      ))
                    ) : (
                      <div className="text-dark/40 dark:text-light/40 px-4 py-5 text-center text-[10px] sm:px-5 sm:py-6 sm:text-xs">
                        هنوز درسی در این بخش منتشر نشده است
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
