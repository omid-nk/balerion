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
    return {
      type: "doc",
      content: [],
    };
  }

  try {
    const parsed = JSON.parse(value);

    if (
      !parsed ||
      typeof parsed !== "object" ||
      Array.isArray(parsed) ||
      parsed.type !== "doc" ||
      !Array.isArray(parsed.content)
    ) {
      throw new Error();
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
      throw new Error();
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

function parseCategoryIds(value) {
  try {
    const parsed = typeof value === "string" ? JSON.parse(value) : value;

    if (!Array.isArray(parsed)) {
      throw new Error();
    }

    return [...new Set(parsed.map((id) => String(id).trim()).filter(Boolean))];
  } catch {
    throw new Error("دسته‌بندی‌های دوره معتبر نیستند.");
  }
}

function getFinalCoverPath(tempPath, courseId) {
  if (!tempPath) {
    return null;
  }

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

export async function updateCourse(courseId, data) {
  const supabase = createClient();

  if (!courseId) {
    throw new Error("شناسه دوره معتبر نیست.");
  }

  const {
    name,
    slug,
    duration,
    cover_url,
    short_description,
    price,
    discount_price,
    category_ids,
    prerequisites,
    completion_percent,
    content,
    status = "draft",
    previous_cover_url,
  } = data;

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

  const parsedCategoryIds = parseCategoryIds(category_ids);

  if (parsedCategoryIds.length === 0) {
    throw new Error("حداقل یک دسته‌بندی برای دوره انتخاب کنید.");
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

  const isNewCover = cover_url && cover_url !== previous_cover_url;

  if (isNewCover && !String(cover_url).startsWith("temp/")) {
    throw new Error("مسیر تصویر دوره معتبر نیست.");
  }

  let finalCoverPath = previous_cover_url || null;
  let newCoverPath = null;

  try {
    // -----------------------------------------------------
    // 1. Update course
    // -----------------------------------------------------

    const updateData = {
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
    };

    const { error: courseError } = await supabase
      .from("courses")
      .update(updateData)
      .eq("id", courseId);

    if (courseError) {
      if (courseError.code === "23505") {
        throw new Error("این اسلاگ قبلاً برای یک دوره استفاده شده است.");
      }

      throw new Error(courseError.message || "ویرایش دوره با خطا مواجه شد.");
    }

    // -----------------------------------------------------
    // 2. Move new cover
    // -----------------------------------------------------

    if (isNewCover) {
      newCoverPath = getFinalCoverPath(cover_url, courseId);

      const { error: moveError } = await supabase.storage
        .from(BUCKET_NAME)
        .move(cover_url, newCoverPath);

      if (moveError) {
        throw new Error(
          moveError.message || "انتقال تصویر دوره با خطا مواجه شد.",
        );
      }

      finalCoverPath = newCoverPath;

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

      if (previous_cover_url && previous_cover_url !== finalCoverPath) {
        await deleteStorageFile(supabase, previous_cover_url);
      }
    }

    // -----------------------------------------------------
    // 3. Replace course categories
    // -----------------------------------------------------

    const { error: deleteCategoriesError } = await supabase
      .from("course_categories")
      .delete()
      .eq("course_id", courseId);

    if (deleteCategoriesError) {
      throw new Error(
        deleteCategoriesError.message ||
          "حذف دسته‌بندی‌های قبلی با خطا مواجه شد.",
      );
    }

    const categoryRows = parsedCategoryIds.map((categoryId) => ({
      course_id: courseId,
      category_id: categoryId,
    }));

    const { error: categoryError } = await supabase
      .from("course_categories")
      .insert(categoryRows);

    if (categoryError) {
      throw new Error(
        categoryError.message || "ذخیره دسته‌بندی‌های دوره با خطا مواجه شد.",
      );
    }

    return {
      success: true,
      course: {
        id: courseId,
        name: name.trim(),
        slug: slug.trim(),
        cover_url: finalCoverPath,
        category_ids: parsedCategoryIds,
        prerequisites: parsedPrerequisites,
      },
    };
  } catch (error) {
    console.error("Update course error:", error);

    // اگر کاور جدید منتقل شده ولی ادامه عملیات شکست خورده
    if (newCoverPath && newCoverPath !== previous_cover_url) {
      await deleteStorageFile(supabase, newCoverPath);
    }

    // اگر temp هنوز باقی مانده
    if (cover_url && String(cover_url).startsWith("temp/")) {
      await deleteStorageFile(supabase, cover_url);
    }

    throw error;
  }
}
