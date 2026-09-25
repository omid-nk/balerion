import { createClient } from "@/lib/supabase/server";

/**
 * دریافت کامنت‌های تاییدشده یک دوره
 * برای نمایش عمومی
 */
export async function getCourseComments(
  courseId,
  { page = 1, pageSize = 10 } = {},
) {
  const supabase = await createClient();

  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.min(50, Math.max(1, Number(pageSize) || 10));

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;

  // فقط کامنت‌های اصلی را paginate می‌کنیم.
  const {
    data: rootComments,
    count,
    error: rootError,
  } = await supabase
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
      { count: "exact" },
    )
    .eq("course_id", courseId)
    .eq("status", "approved")
    .is("deleted_at", null)
    .is("parent_id", null)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (rootError) {
    console.error("getCourseComments:", rootError);

    return {
      comments: [],
      total: 0,
      totalPages: 0,
      page: safePage,
      pageSize: safePageSize,
    };
  }

  const comments = rootComments ?? [];

  // اگر این صفحه کامنت اصلی ندارد، دیگر نیازی به گرفتن reply نیست.
  if (comments.length === 0) {
    return {
      comments: [],
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / safePageSize),
      page: safePage,
      pageSize: safePageSize,
    };
  }

  const rootIds = comments.map((comment) => comment.id);

  // تمام replyهای کامنت‌های همین صفحه را می‌گیریم.
  const { data: replies, error: repliesError } = await supabase
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
    .in("parent_id", rootIds)
    .eq("course_id", courseId)
    .eq("status", "approved")
    .is("deleted_at", null)
    .order("created_at", { ascending: true });

  if (repliesError) {
    console.error("getCourseComments replies:", repliesError);

    // خود کامنت‌های اصلی را نگه می‌داریم حتی اگر گرفتن replyها خطا بخورد.
    return {
      comments,
      total: count ?? 0,
      totalPages: Math.ceil((count ?? 0) / safePageSize),
      page: safePage,
      pageSize: safePageSize,
    };
  }

  return {
    comments: [...comments, ...(replies ?? [])],
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / safePageSize),
    page: safePage,
    pageSize: safePageSize,
  };
}

/**
 * دریافت تمام کامنت‌ها برای پنل مدیریت
 * RLS مشخص می‌کند فقط ادمین بتواند این داده‌ها را ببیند.
 */
export async function getAllComments({
  page = 1,
  pageSize = 20,
  status = "all",
} = {}) {
  const supabase = await createClient();
  const safePage = Math.max(1, Number(page) || 1);
  const safePageSize = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;
  let commentsQuery = supabase
    .from("comments")
    .select(
      ` id, author_id, course_id, article_id, parent_id, content, status, created_at, updated_at, deleted_at, profiles:author_id ( username, full_name, avatar_url ), courses:course_id ( id, name, slug ), articles:article_id ( id, title, slug ) `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false })
    .range(from, to);
  if (
    status === "pending" ||
    status === "approved" ||
    status === "rejected" ||
    status === "spam"
  ) {
    commentsQuery = commentsQuery.eq("status", status);
  }
  const [
    { data: comments, count: filteredCount, error: commentsError },
    allCountResult,
    pendingCountResult,
    approvedCountResult,
    rejectedCountResult,
    spamCountResult,
  ] = await Promise.all([
    commentsQuery,
    supabase.from("comments").select("id", { count: "exact", head: true }),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "approved"),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "rejected"),
    supabase
      .from("comments")
      .select("id", { count: "exact", head: true })
      .eq("status", "spam"),
  ]);
  if (commentsError) {
    console.error("getAllComments:", commentsError);
    return {
      comments: [],
      total: 0,
      totalPages: 0,
      page: safePage,
      pageSize: safePageSize,
      counts: { all: 0, pending: 0, approved: 0, rejected: 0, spam: 0 },
    };
  }
  const counts = {
    all: allCountResult.count ?? 0,
    pending: pendingCountResult.count ?? 0,
    approved: approvedCountResult.count ?? 0,
    rejected: rejectedCountResult.count ?? 0,
    spam: spamCountResult.count ?? 0,
  };
  const total = filteredCount ?? 0;
  return {
    comments: comments ?? [],
    total,
    totalPages: Math.ceil(total / safePageSize),
    page: safePage,
    pageSize: safePageSize,
    counts,
  };
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
