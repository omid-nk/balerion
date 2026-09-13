import { createClient } from "@/lib/supabase/server";

/**
 * دریافت کامنت‌های تاییدشده یک دوره
 * برای نمایش عمومی
 */
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
      deleted_at,
      profiles:author_id (
        username,
        full_name,
        avatar_url
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

/**
 * دریافت تمام کامنت‌ها برای پنل مدیریت
 * RLS مشخص می‌کند فقط ادمین بتواند این داده‌ها را ببیند.
 */
export async function getAllComments() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      author_id,
      course_id,
      article_id,
      parent_id,
      content,
      status,
      created_at,
      updated_at,
      deleted_at,
      profiles:author_id (
        username,
        full_name,
        avatar_url
      ),
      courses:course_id (
        id,
        name,
        slug
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllComments:", error);
    return [];
  }

  return data ?? [];
}

/**
 * دریافت کامنت‌های یک کاربر
 */
export async function getUserComments(userId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .select(
      `
      id,
      course_id,
      article_id,
      parent_id,
      content,
      status,
      created_at,
      updated_at,
      deleted_at,
      courses:course_id (
        id,
        name,
        slug
      )
    `,
    )
    .eq("author_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getUserComments:", error);
    return [];
  }

  return data ?? [];
}

/**
 * ایجاد کامنت
 * فقط کاربر لاگین‌شده می‌تواند این کار را انجام دهد.
 */
export async function createComment({
  courseId = null,
  articleId = null,
  parentId = null,
  content,
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "برای ثبت نظر باید وارد حساب کاربری شوید.",
    };
  }

  const cleanContent = content?.trim();

  if (!cleanContent) {
    return {
      success: false,
      error: "متن نظر نمی‌تواند خالی باشد.",
    };
  }

  if (
    (courseId === null && articleId === null) ||
    (courseId !== null && articleId !== null)
  ) {
    return {
      success: false,
      error: "کامنت باید متعلق به یک دوره یا مقاله باشد.",
    };
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      author_id: user.id,
      course_id: courseId,
      article_id: articleId,
      parent_id: parentId,
      content: cleanContent,
      status: "pending",
    })
    .select(
      `
      id,
      author_id,
      course_id,
      article_id,
      parent_id,
      content,
      status,
      created_at,
      updated_at,
      profiles:author_id (
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .single();

  if (error) {
    console.error("createComment:", error);

    return {
      success: false,
      error: "ثبت نظر انجام نشد.",
    };
  }

  return {
    success: true,
    data,
  };
}

/**
 * ویرایش کامنت توسط نویسنده
 *
 * با RLS فعلی باید برای این قابلیت policy مربوط به update نویسنده
 * هم داشته باشیم. در غیر این صورت فقط ادمین می‌تواند update کند.
 */
export async function updateComment(commentId, content) {
  const supabase = await createClient();

  const cleanContent = content?.trim();

  if (!cleanContent) {
    return {
      success: false,
      error: "متن نظر نمی‌تواند خالی باشد.",
    };
  }

  const { data, error } = await supabase
    .from("comments")
    .update({
      content: cleanContent,
      status: "pending",
    })
    .eq("id", commentId)
    .select(
      `
      id,
      author_id,
      course_id,
      article_id,
      parent_id,
      content,
      status,
      created_at,
      updated_at
    `,
    )
    .single();

  if (error) {
    console.error("updateComment:", error);

    return {
      success: false,
      error: "ویرایش نظر انجام نشد.",
    };
  }

  return {
    success: true,
    data,
  };
}

/**
 * حذف نرم کامنت
 */
export async function deleteComment(commentId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", commentId)
    .select("id, deleted_at")
    .single();

  if (error) {
    console.error("deleteComment:", error);

    return {
      success: false,
      error: "حذف نظر انجام نشد.",
    };
  }

  return {
    success: true,
    data,
  };
}

/**
 * تغییر وضعیت کامنت توسط ادمین
 *
 * RLS دیتابیس اجازه این update را فقط به ادمین می‌دهد.
 */
export async function updateCommentStatus(commentId, status) {
  const allowedStatuses = ["pending", "approved", "rejected", "spam"];

  if (!allowedStatuses.includes(status)) {
    return {
      success: false,
      error: "وضعیت کامنت نامعتبر است.",
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .update({
      status,
    })
    .eq("id", commentId)
    .select(
      `
      id,
      author_id,
      course_id,
      article_id,
      parent_id,
      content,
      status,
      created_at,
      updated_at,
      deleted_at,
      profiles:author_id (
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .single();

  if (error) {
    console.error("updateCommentStatus:", error);

    return {
      success: false,
      error: "تغییر وضعیت نظر انجام نشد.",
    };
  }

  return {
    success: true,
    data,
  };
}

/**
 * حذف نرم کامنت توسط ادمین
 */
export async function adminDeleteComment(commentId) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", commentId)
    .select("id, deleted_at")
    .single();

  if (error) {
    console.error("adminDeleteComment:", error);

    return {
      success: false,
      error: "حذف نظر انجام نشد.",
    };
  }

  return {
    success: true,
    data,
  };
}
