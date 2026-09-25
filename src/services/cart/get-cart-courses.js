import { createClient } from "@/lib/supabase/client";

export async function getCartCourses(courseIds) {
  if (!courseIds?.length) {
    return [];
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      id,
      name,
      slug,
      cover_url,
      short_description,
      price,
      discount_price,
      duration,
      student_count,
      status
    `,
    )
    .in("id", courseIds)
    .eq("status", "active");

  if (error) {
    console.error("getCartCourses:", error);
    throw error;
  }

  return data ?? [];
}
