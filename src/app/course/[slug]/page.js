import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

import HeroSectionCoursePage from "@/components/modules/courseDetail/HeroSectionCoursePage";
import InfoBoxes from "@/components/modules/courseDetail/InfoBoxes";
import Content from "@/components/modules/courseDetail/Content";
import Comments from "@/components/modules/courseDetail/Comments";
import Sidebar from "@/components/modules/courseDetail/Sidebar";

export default async function CoursePage({ params }) {
  const { slug } = await params;

  const supabase = await createClient();

  // گرفتن اطلاعات دوره
  const { data: course, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !course) {
    notFound();
  }

  // گرفتن دسته‌بندی‌های دوره
  const { data: relations } = await supabase
    .from("course_categories")
    .select(
      `
      categories (
        id,
        cat_name,
        cat_slug
      )
    `,
    )
    .eq("course_id", course.id);

  const categories = relations?.map((item) => item.categories) ?? [];
  return (
    <section>
      <HeroSectionCoursePage
        courseId={course.id}
        title={course.name}
        slug={course.slug}
        cover={course.cover_url}
        description={course.short_description}
        price={course.price}
      />

      <div className="my-12 flex flex-col gap-3 lg:flex-row">
        {/* body */}
        <section className="flex w-full flex-col gap-4">
          {/* info Box */}
          <InfoBoxes
            completionPercent={course.completion_percent}
            duration={course.duration}
            studentCount={course.student_count}
            lastUpdatedAt={course.updated_at}
          />

          {/* content */}
          <Content content={course.content} />

          {/* comments */}
          <Comments />
        </section>

        {/* sidebar */}
        <Sidebar completionPercent={course.completion_percent} />
      </div>
    </section>
  );
}
