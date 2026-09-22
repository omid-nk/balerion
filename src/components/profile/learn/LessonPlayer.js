"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCheck,
  LuDownload,
  LuTriangleAlert,
} from "react-icons/lu";

export default function LessonPlayer({ course, lesson, section, nextLesson }) {
  const [completed, setCompleted] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const hasAttachment = Boolean(lesson.attachment_path);

  function handleComplete() {
    setShowWarning(true);
  }

  function confirmComplete() {
    setCompleted(true);
    setShowWarning(false);
  }

  return (
    <section className="space-y-5 sm:space-y-6">
      {/* Video */}
      <div className="bg-dark relative aspect-video overflow-hidden rounded-xl">
        {lesson.video_path ? (
          <video
            controls
            className="size-full object-contain"
            src={lesson.video_path}
          />
        ) : (
          <div className="text-light/40 flex size-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium">
                ویدئوی این درس هنوز قرار نگرفته است
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lesson header */}
      <div>
        <div className="text-dark/40 dark:text-light/40 mb-2 flex items-center gap-2 text-[10px] sm:text-xs">
          <span>{section.title}</span>
          <span>•</span>
          <span>درس {String(lesson.position).padStart(2, "0")}</span>
        </div>

        <h1 className="text-base leading-7 font-bold sm:text-xl sm:leading-8">
          {lesson.title}
        </h1>
      </div>

      {/* Attachment */}
      <div className="border-border flex items-center justify-between gap-3 border-y py-8">
        <div className="min-w-0">
          <p className="text-xs font-medium">فایل دوره</p>

          <p className="text-dark/40 dark:text-light/40 mt-1 truncate text-[10px]">
            {hasAttachment
              ? lesson.attachment_name || "فایل قابل دانلود"
              : "برای این درس فایلی وجود ندارد"}
          </p>
        </div>

        <button
          type="button"
          disabled={!hasAttachment}
          onClick={() => {
            if (!lesson.attachment_path) return;
            const link = document.createElement("a");
            link.href = lesson.attachment_path;
            link.download = lesson.attachment_name || "course-file";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.click();
          }}
          className="border-border text-dark/70 dark:text-light/70 enabled:hover:border-primary enabled:hover:text-primary flex h-9 shrink-0 items-center gap-1.5 rounded-lg border px-3 text-[10px] transition disabled:cursor-not-allowed disabled:opacity-30"
        >
          {" "}
          <LuDownload size={14} /> <span>دانلود فایل</span>{" "}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={`/profile/learn/${course.slug}`}
          className="border-border text-dark/60 dark:text-light/60 hover:border-primary hover:text-primary flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-[10px] transition sm:text-xs"
        >
          <LuArrowRight size={14} />
          <span>بازگشت به سرفصل‌ها</span>
        </Link>

        {nextLesson ? (
          <Link
            href={`/profile/learn/${course.slug}/${nextLesson.slug}`}
            className="bg-primary hover:bg-primary/90 text-light flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-[10px] font-medium transition sm:text-xs"
          >
            <span>درس بعدی</span>
            <LuArrowLeft size={14} />
          </Link>
        ) : (
          <span className="text-dark/30 dark:text-light/30 flex h-10 items-center justify-center rounded-lg px-4 text-[10px] sm:text-xs">
            آخرین درس دوره
          </span>
        )}
      </div>

      {/* Warning modal */}
      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-light dark:bg-dark border-border w-full max-w-sm rounded-xl border p-5 shadow-xl">
            <div className="bg-alert/10 text-alert mx-auto flex size-11 items-center justify-center rounded-xl">
              <LuTriangleAlert size={20} />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-sm font-bold">مطمئن هستید؟</h3>

              <p className="text-dark/50 dark:text-light/50 mt-2 text-[10px] leading-5 sm:text-xs">
                بعد از تأیید، این درس به عنوان مشاهده‌شده ثبت می‌شود و دیگر
                امکان بازگشت به این درس را نخواهید داشت.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setShowWarning(false)}
                className="border-border text-dark/60 dark:text-light/60 hover:border-primary hover:text-primary h-10 rounded-lg border text-[10px] transition"
              >
                انصراف
              </button>

              <button
                type="button"
                onClick={confirmComplete}
                className="bg-primary text-light h-10 rounded-lg text-[10px] font-medium"
              >
                بله، تأیید می‌کنم
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
