import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

import { getCourseLesson } from "@/services/learning/get-course-lesson";
import LessonPlayer from "@/components/profile/learn/LessonPlayer";

export default async function LessonPage({ params }) {
  const { courseSlug, lessonSlug } = await params;

  const data = await getCourseLesson(courseSlug, lessonSlug);

  if (!data) {
    return (
      <div className="border-border flex min-h-72 items-center justify-center rounded-xl border border-dashed px-4">
        <div className="text-center">
          <p className="text-sm font-medium">درس مورد نظر پیدا نشد</p>

          <Link
            href={`/profile/learn/${courseSlug}`}
            className="text-primary mt-4 inline-flex items-center gap-1.5 text-xs"
          >
            <LuArrowRight size={14} />
            <span>بازگشت به سرفصل‌ها</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <LessonPlayer
      course={data.course}
      lesson={data.lesson}
      section={data.section}
      nextLesson={data.nextLesson}
    />
  );
}
