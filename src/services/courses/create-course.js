import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "course-covers";

function parseNumber(value, fallback = null) {
  if (value === "" || value === null || value === undefined) {
    return fallback;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

function parseContent(value) {
  if (!value || !String(value).trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("محتوای JSON دوره باید به صورت آرایه باشد.");
    }

    return parsed;
  } catch {
    throw new Error("محتوای JSON دوره معتبر نیست.");
  }
}

function parsePrerequisites(value) {
  if (!value || !String(value).trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      throw new Error("پیش‌نیازهای دوره باید به صورت آرایه باشد.");
    }

    return parsed
      .map((item) => ({
        name: String(item?.name || "").trim(),
        slug: String(item?.slug || "").trim(),
      }))
      .filter((item) => item.name);
  } catch {
    throw new Error("اطلاعات پیش‌نیازهای دوره معتبر نیست.");
  }
}

function getFinalCoverPath(tempPath, courseId) {
  if (!tempPath) return null;

  const fileName = tempPath.split("/").pop();

  if (!fileName) {
    throw new Error("مسیر تصویر دوره معتبر نیست.");
  }

  return `courses/${courseId}/cover-${fileName}`;
}

async function deleteStorageFile(supabase, path) {
  if (!path) return;

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    console.error("Course cover cleanup error:", error);
  }
}

export async function createCourse(data) {
  const supabase = createClient();

  let courseId = null;
  let finalCoverPath = null;

  const {
    name,
    slug,
    duration,
    cover_url,
    short_description,
    price,
    discount_price,
    category_id,
    prerequisites,
    completion_percent,
    content,
    status = "draft",
  } = data;

  /*
   * -------------------------------------------------------
   * Validation
   * -------------------------------------------------------
   */

  if (!name?.trim()) {
    throw new Error("تیتر دوره الزامی است.");
  }

  if (!slug?.trim()) {
    throw new Error("اسلاگ دوره الزامی است.");
  }

  if (!duration?.trim()) {
    throw new Error("مدت زمان دوره الزامی است.");
  }

  if (!short_description?.trim()) {
    throw new Error("توضیحات کوتاه دوره الزامی است.");
  }

  if (!category_id) {
    throw new Error("انتخاب دسته‌بندی دوره الزامی است.");
  }

  if (!["draft", "active"].includes(status)) {
    throw new Error("وضعیت دوره معتبر نیست.");
  }

  const parsedPrice = parseNumber(price, 0);

  const parsedDiscountPrice = parseNumber(discount_price, null);

  const parsedCompletionPercent = parseNumber(completion_percent, 0);

  const parsedContent = parseContent(content);

  const parsedPrerequisites = parsePrerequisites(prerequisites);

  if (parsedPrice < 0) {
    throw new Error("قیمت دوره نمی‌تواند منفی باشد.");
  }

  if (parsedDiscountPrice !== null && parsedDiscountPrice < 0) {
    throw new Error("قیمت با تخفیف نمی‌تواند منفی باشد.");
  }

  if (parsedDiscountPrice !== null && parsedDiscountPrice > parsedPrice) {
    throw new Error("قیمت با تخفیف نمی‌تواند بیشتر از قیمت اصلی باشد.");
  }

  if (parsedCompletionPercent < 0 || parsedCompletionPercent > 100) {
    throw new Error("درصد تکمیل محتوا باید بین ۰ تا ۱۰۰ باشد.");
  }

  /*
   * فقط اجازه می‌دهیم cover_url یک فایل موقت
   * از bucket خودمان باشد.
   */

  if (cover_url && !String(cover_url).startsWith("temp/")) {
    throw new Error("مسیر تصویر دوره معتبر نیست.");
  }

  try {
    /*
     * -----------------------------------------------------
     * 1. Create course
     * -----------------------------------------------------
     */

    const { data: course, error: courseError } = await supabase
      .from("courses")
      .insert({
        name: name.trim(),
        slug: slug.trim(),
        duration: duration.trim(),
        short_description: short_description.trim(),
        price: parsedPrice,
        discount_price: parsedDiscountPrice,
        prerequisites: parsedPrerequisites,
        completion_percent: parsedCompletionPercent,
        content: parsedContent,
        status,
      })
      .select("id")
      .single();

    if (courseError) {
      if (courseError.code === "23505") {
        throw new Error("این اسلاگ قبلاً برای یک دوره استفاده شده است.");
      }

      throw new Error(courseError.message || "ساخت دوره با خطا مواجه شد.");
    }

    courseId = course.id;

    /*
     * -----------------------------------------------------
     * 2. Move temporary cover to final location
     * -----------------------------------------------------
     */

    if (cover_url) {
      finalCoverPath = getFinalCoverPath(cover_url, courseId);

      const { error: moveError } = await supabase.storage
        .from(BUCKET_NAME)
        .move(cover_url, finalCoverPath);

      if (moveError) {
        throw new Error(
          moveError.message || "انتقال تصویر دوره با خطا مواجه شد.",
        );
      }

      /*
       * ---------------------------------------------------
       * 3. Save final cover path in course
       * ---------------------------------------------------
       */

      const { error: coverUpdateError } = await supabase
        .from("courses")
        .update({
          cover_url: finalCoverPath,
        })
        .eq("id", courseId);

      if (coverUpdateError) {
        throw new Error(
          coverUpdateError.message || "ذخیره تصویر دوره با خطا مواجه شد.",
        );
      }
    }

    /*
     * -----------------------------------------------------
     * 4. Create course-category relation
     * -----------------------------------------------------
     */

    const { error: categoryError } = await supabase
      .from("course_categories")
      .insert({
        course_id: courseId,
        category_id: category_id,
      });

    if (categoryError) {
      throw new Error(
        categoryError.message || "اتصال دسته‌بندی به دوره با خطا مواجه شد.",
      );
    }

    /*
     * -----------------------------------------------------
     * 5. Return created course
     * -----------------------------------------------------
     */

    return {
      success: true,
      course: {
        id: courseId,
        name: name.trim(),
        slug: slug.trim(),
        cover_url: finalCoverPath,
        prerequisites: parsedPrerequisites,
      },
    };
  } catch (error) {
    console.error("Create course error:", error);

    /*
     * -----------------------------------------------------
     * Cleanup
     * -----------------------------------------------------
     */

    if (finalCoverPath) {
      await deleteStorageFile(supabase, finalCoverPath);
    }

    if (cover_url && cover_url !== finalCoverPath) {
      await deleteStorageFile(supabase, cover_url);
    }

    if (courseId) {
      const { error: deleteCourseError } = await supabase
        .from("courses")
        .delete()
        .eq("id", courseId);

      if (deleteCourseError) {
        console.error("Course rollback error:", deleteCourseError);
      }
    }

    throw error;
  }
}
