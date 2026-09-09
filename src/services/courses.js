import { createClient } from "@/lib/supabase/server";

export async function getCourses({ type, title, sort, limit = 20 } = {}) {
  const supabase = await createClient();

  let query = supabase.from("courses").select("*").eq("status", "active");

  if (type === "free") {
    query = query.eq("price", 0);
  }

  if (title) {
    query = query.ilike("name", `%${title}%`);
  }

  query = query.order("created_at", {
    ascending: sort === "oldest",
  });

  const { data, error } = await query.limit(limit);

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getCategoryBySlug(slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}

export async function getCoursesByCategory(categoryId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("course_categories")
    .select(
      `
      courses (*)
    `,
    )
    .eq("category_id", categoryId)
    .eq("courses.status", "active");

  if (error) {
    throw error;
  }

  return (data ?? []).map((item) => item.courses).filter(Boolean);
}

export async function getCourseBySlug(slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
