import { createClient } from "@/lib/supabase/client";

const BUCKET_NAME = "course-covers";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

function validateImage(file) {
  if (!file) {
    throw new Error("تصویری برای آپلود انتخاب نشده است.");
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("فرمت تصویر باید JPG، PNG یا WEBP باشد.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.");
  }
}

function getExtension(file) {
  const extensionMap = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return extensionMap[file.type];
}

/**
 * آپلود موقت تصویر کاور دوره
 *
 * خروجی:
 * {
 *   path: "temp/uuid.webp",
 *   fileName: "uuid.webp"
 * }
 */
export async function uploadCourseCoverTemp(file) {
  validateImage(file);

  const supabase = createClient();

  const extension = getExtension(file);

  const fileName = `${crypto.randomUUID()}.${extension}`;

  const filePath = `temp/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    console.error("Course cover upload error:", error);

    throw new Error(error.message || "آپلود تصویر دوره با خطا مواجه شد.");
  }

  return {
    path: filePath,
    fileName,
  };
}

/**
 * حذف تصویر کاور
 */
export async function deleteCourseCover(filePath) {
  if (!filePath) return;

  const supabase = createClient();

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

  if (error) {
    console.error("Course cover delete error:", error);

    throw new Error(error.message || "حذف تصویر دوره با خطا مواجه شد.");
  }
}

/**
 * دریافت URL عمومی تصویر
 *
 * فقط برای bucket عمومی استفاده شود.
 */
export function getCourseCoverUrl(filePath) {
  if (!filePath) return "";

  const supabase = createClient();

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
}
