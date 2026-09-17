import { createClient } from "@/lib/supabase/client";

export async function getCourseForEdit(slug) {
  const supabase = createClient();

  if (!slug?.trim()) {
    throw new Error("اسلاگ دوره معتبر نیست.");
  }

  const { data: course, error } = await supabase
    .from("courses")
    .select(
      `
      id,
      name,
      slug,
      duration,
      cover_url,
      short_description,
      price,
      discount_price,
      prerequisites,
      completion_percent,
      content,
      status,
      course_categories (
        category_id
      )
    `,
    )
    .eq("slug", slug.trim())
    .single();

  if (error) {
    console.error("Get course for edit error:", error);

    if (error.code === "PGRST116") {
      throw new Error("دوره موردنظر پیدا نشد.");
    }

    throw new Error(error.message || "دریافت اطلاعات دوره با خطا مواجه شد.");
  }

  return {
    ...course,
    category_ids: Array.isArray(course.course_categories)
      ? course.course_categories.map((item) => String(item.category_id))
      : [],
  };
}
