import { createClient } from "@/lib/supabase/server";

export async function getCourseCurriculum(courseSlug) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    return null;
  }

  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(
      `
      id,
      name,
      slug,
      cover_url,
      short_description,
      duration,
      student_count,
      completion_percent,
      status
    `,
    )
    .eq("slug", courseSlug)
    .eq("status", "active")
    .single();

  if (courseError) {
    if (courseError.code === "PGRST116") {
      return null;
    }

    throw courseError;
  }

  const { data: sections, error: sectionsError } = await supabase
    .from("course_sections")
    .select(
      `
      id,
      title,
      position,
      course_lessons (
        id,
        title,
        slug,
        duration,
        position,
        is_preview,
        status
      )
    `,
    )
    .eq("course_id", course.id)
    .order("position", { ascending: true });

  if (sectionsError) {
    throw sectionsError;
  }

  const formattedSections = sections
    .map((section) => ({
      ...section,
      course_lessons: section.course_lessons
        .filter((lesson) => lesson.status === "published")
        .sort((a, b) => a.position - b.position),
    }))
    .sort((a, b) => a.position - b.position);

  return {
    course,
    sections: formattedSections,
  };
}
