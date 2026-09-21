import { createClient } from "@/lib/supabase/server";

export async function getMyCourses() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select(
      `id,status,source,enrolled_at,courses(id,name,slug,cover_url,short_description,price,discount_price,duration,student_count,completion_percent,status)`,
    )
    .eq("user_id", user.id)
    .eq("status", "active")
    .order("enrolled_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data
    .filter((enrollment) => enrollment.courses)
    .map((enrollment) => ({
      enrollmentId: enrollment.id,
      status: enrollment.status,
      source: enrollment.source,
      enrolledAt: enrollment.enrolled_at,
      expiresAt: enrollment.expires_at,
      course: enrollment.courses,
    }));
}
