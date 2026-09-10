import { createClient } from "@/lib/supabase/server";

export async function getCourseComments(courseId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      author_id,
      course_id,
      parent_id,
      content,
      status,
      created_at,
      updated_at,
      profiles:author_id (
        username,
        full_name,
        avatar_url,
        role
      )
    `,
    )
    .eq("course_id", courseId)
    .eq("status", "approved")
    .is("deleted_at", null)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getCourseComments:", error);
    return [];
  }

  return data ?? [];
}
