import { createClient } from "@/lib/supabase/server";

export async function getCourseLesson(courseSlug, lessonSlug) {
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

  // دوره
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .select(
      `
      id,
      name,
      slug,
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

  // درس فعلی
  const { data: lesson, error: lessonError } = await supabase
    .from("course_lessons")
    .select(
      `
      id,
      section_id,
      title,
      slug,
      description,
      video_path,
      attachment_path,
      attachment_name,
      duration,
      position,
      is_preview,
      status,
      course_sections (
        id,
        title,
        position,
        course_id
      )
    `,
    )
    .eq("slug", lessonSlug)
    .eq("status", "published")
    .single();

  if (lessonError) {
    if (lessonError.code === "PGRST116") {
      return null;
    }

    throw lessonError;
  }

  const section = lesson.course_sections;

  // مطمئن می‌شویم درس متعلق به همین دوره است
  if (!section || section.course_id !== course.id) {
    return null;
  }

  // تمام درس‌های منتشرشده این دوره
  const { data: lessons, error: lessonsError } = await supabase
    .from("course_lessons")
    .select(
      `
      id,
      title,
      slug,
      position,
      section_id,
      course_sections!inner (
        id,
        position,
        course_id
      )
    `,
    )
    .eq("status", "published")
    .eq("course_sections.course_id", course.id);

  if (lessonsError) {
    throw lessonsError;
  }

  // مرتب‌سازی واقعی:
  // اول ترتیب فصل، بعد ترتیب درس
  const sortedLessons = [...lessons].sort((a, b) => {
    const sectionPositionA = a.course_sections.position;
    const sectionPositionB = b.course_sections.position;

    if (sectionPositionA !== sectionPositionB) {
      return sectionPositionA - sectionPositionB;
    }

    return a.position - b.position;
  });

  const currentIndex = sortedLessons.findIndex((item) => item.id === lesson.id);

  const nextLesson =
    currentIndex !== -1 ? (sortedLessons[currentIndex + 1] ?? null) : null;

  return {
    course,
    lesson,
    section,
    nextLesson,
  };
}
