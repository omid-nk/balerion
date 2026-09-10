import { LuAlignLeft } from "react-icons/lu";

import ContentRenderer from "@/components/shared/ContentRenderer";

export default function CourseContent({ content }) {
  return (
    <article className="bg-light dark:bg-dark mt-4 rounded-lg p-4 sm:p-6">
      <header className="border-border font-morabba flex items-center gap-2 border-b px-1 pb-4 text-lg select-none sm:px-3 sm:text-xl">
        <LuAlignLeft className="text-primary size-5 shrink-0 sm:size-6" />

        <h2>توضیحات</h2>
      </header>

      <div className="min-w-0">
        <ContentRenderer content={content} />
      </div>
    </article>
  );
}
