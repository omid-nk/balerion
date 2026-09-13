"use client";

import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  LuCheck,
  LuClock3,
  LuMessageSquare,
  LuPencil,
  LuRefreshCw,
  LuReply,
  LuSave,
  LuX,
} from "react-icons/lu";
import { createClient } from "@/lib/supabase/client";

const statusConfig = {
  pending: {
    label: "در انتظار بررسی",
    className: "bg-warning/10 text-warning",
  },
  approved: {
    label: "تأیید شده",
    className: "bg-primary/10 text-primary",
  },
  rejected: {
    label: "رد شده",
    className: "bg-alert/10 text-alert",
  },
  spam: {
    label: "اسپم",
    className: "bg-dark/10 text-dark/60 dark:bg-light/10 dark:text-light/60",
  },
};

export default function CommentAdminItem({
  comment,
  onUpdate,
  onAddReply,
  currentUserId,
}) {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const profile = comment.profiles;

  const displayName = profile?.full_name || profile?.username || "کاربر";

  const post = comment.courses
    ? {
        type: "course",
        title: comment.courses.name,
      }
    : comment.articles
      ? {
          type: "article",
          title: comment.articles.title,
        }
      : {
          type: null,
          title: "محتوای حذف‌شده",
        };

  const status = statusConfig[comment.status] || statusConfig.pending;

  async function updateStatus(newStatus) {
    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("comments")
        .update({
          status: newStatus,
        })
        .eq("id", comment.id)
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
          deleted_at
        `,
        )
        .single();

      if (error) {
        console.error("updateCommentStatus:", error);
        toast.error("تغییر وضعیت انجام نشد.");
        return;
      }

      onUpdate({
        ...comment,
        ...data,
      });

      toast.success(
        newStatus === "approved"
          ? "نظر تأیید شد."
          : newStatus === "rejected"
            ? "نظر رد شد."
            : "وضعیت نظر تغییر کرد.",
      );
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  async function saveEdit() {
    const value = content.trim();

    if (!value) {
      toast.error("متن نظر نمی‌تواند خالی باشد.");
      return;
    }

    if (value.length < 3) {
      toast.error("متن نظر خیلی کوتاه است.");
      return;
    }

    if (value.length > 2000) {
      toast.error("متن نظر نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("comments")
        .update({
          content: value,
        })
        .eq("id", comment.id)
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
          deleted_at
        `,
        )
        .single();

      if (error) {
        console.error("editComment:", error);
        toast.error("ویرایش نظر انجام نشد.");
        return;
      }

      onUpdate({
        ...comment,
        ...data,
      });

      setContent(value);
      setEditing(false);

      toast.success("نظر با موفقیت ویرایش شد.");
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد.");
    } finally {
      setLoading(false);
    }
  }

  function cancelEdit() {
    setContent(comment.content);
    setEditing(false);
  }

  async function submitReply() {
    const value = replyContent.trim();

    if (!value) {
      toast.error("متن پاسخ را وارد کنید.");
      return;
    }

    if (value.length < 3) {
      toast.error("متن پاسخ خیلی کوتاه است.");
      return;
    }

    if (value.length > 2000) {
      toast.error("متن پاسخ نمی‌تواند بیشتر از ۲۰۰۰ کاراکتر باشد.");
      return;
    }

    if (!currentUserId) {
      toast.error("شناسه کاربر ادمین پیدا نشد.");
      return;
    }

    setReplyLoading(true);

    try {
      const supabase = createClient();

      const payload = {
        author_id: currentUserId,
        parent_id: comment.id,
        content: value,
        status: "approved",
        course_id: comment.course_id ?? null,
        article_id: comment.article_id ?? null,
      };

      const { data: insertedComment, error: insertError } = await supabase
        .from("comments")
        .insert(payload)
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
          deleted_at
        `,
        )
        .single();

      if (insertError) {
        console.error("submitReply insert error:", insertError);
        console.error("submitReply payload:", payload);

        toast.error(insertError.message || "ثبت پاسخ انجام نشد.");

        return;
      }

      const { data: reply, error: replyError } = await supabase
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
        ),
        articles:article_id (
          id,
          title,
          slug
        )
      `,
        )
        .eq("id", insertedComment.id)
        .single();

      if (replyError) {
        console.error("submitReply fetch error:", replyError);

        // خود پاسخ ثبت شده؛ فقط اطلاعات کاملش را نتوانستیم بگیریم.
        setReplyContent("");
        setReplying(false);

        onAddReply?.({
          ...insertedComment,
          profiles: {
            username: profile?.username ?? null,
            full_name: profile?.full_name ?? null,
            avatar_url: profile?.avatar_url ?? null,
          },
          courses: comment.courses ?? null,
          articles: comment.articles ?? null,
        });

        toast.success("پاسخ با موفقیت ثبت شد.");

        return;
      }

      setReplyContent("");
      setReplying(false);

      onAddReply?.(reply);

      toast.success("پاسخ با موفقیت ثبت شد.");
    } catch (error) {
      console.error("submitReply exception:", error);

      toast.error("خطایی هنگام ثبت پاسخ رخ داد.");
    } finally {
      setReplyLoading(false);
    }
  }

  return (
    <article className="bg-background dark:bg-dark/50 border-dark/10 dark:border-light/10 rounded-xl border p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          {/* Avatar */}
          <div className="bg-primary/10 relative size-10 shrink-0 overflow-hidden rounded-full">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={displayName}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <div className="text-primary flex size-full items-center justify-center text-sm font-bold">
                {displayName.charAt(0)}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-bold">{displayName}</span>

              <span className="text-dark/40 dark:text-light/40 text-xs">
                {profile?.username ? `@${profile.username}` : ""}
              </span>
            </div>

            <div className="text-dark/40 dark:text-light/40 mt-1 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="flex items-center gap-1">
                <LuClock3 size={12} />
                {new Date(comment.created_at).toLocaleString("fa-IR")}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <span
          className={`inline-flex w-fit items-center rounded-lg px-2.5 py-1.5 text-[11px] font-medium ${status.className}`}
        >
          {status.label}
        </span>
      </div>

      {/* Target */}
      <div className="bg-light dark:bg-dark/50 mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-3 py-2.5 text-xs">
        <LuMessageSquare size={14} className="text-primary" />

        <span className="text-dark/50 dark:text-light/50">
          {post.type === "course"
            ? "دوره:"
            : post.type === "article"
              ? "مقاله:"
              : "محتوا:"}
        </span>

        <span className="font-medium">{post.title}</span>
      </div>

      {/* Comment */}
      <div className="mt-4">
        {editing ? (
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            disabled={loading}
            maxLength={2000}
            rows={5}
            className="bg-light dark:bg-dark min-h-28 w-full resize-none rounded-xl border-0 p-4 text-sm leading-7 outline-none"
          />
        ) : (
          <p className="text-dark/75 dark:text-light/75 text-sm leading-7">
            {comment.content}
          </p>
        )}
      </div>

      {/* Reply */}
      {replying && (
        <div className="bg-primary/5 mt-4 rounded-xl p-4">
          <div className="mb-3 flex items-center gap-2">
            <LuReply size={15} className="text-primary" />

            <span className="text-sm font-medium">پاسخ به این کامنت</span>
          </div>

          <textarea
            value={replyContent}
            onChange={(event) => setReplyContent(event.target.value)}
            disabled={replyLoading}
            maxLength={2000}
            rows={4}
            placeholder="پاسخ خود را بنویسید..."
            className="bg-light dark:bg-dark min-h-24 w-full resize-none rounded-xl border-0 p-4 text-sm leading-7 outline-none"
          />

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={submitReply}
              disabled={replyLoading}
              className="bg-primary flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <LuReply size={14} />

              {replyLoading ? "در حال ارسال..." : "ارسال پاسخ"}
            </button>

            <button
              type="button"
              onClick={() => {
                setReplyContent("");
                setReplying(false);
              }}
              disabled={replyLoading}
              className="bg-dark/5 dark:bg-light/5 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
            >
              <LuX size={14} />
              انصراف
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="border-dark/10 dark:border-light/10 mt-4 flex flex-wrap items-center gap-2 border-t pt-4">
        {editing ? (
          <>
            <button
              type="button"
              onClick={saveEdit}
              disabled={loading}
              className="bg-primary flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              <LuSave size={14} />

              {loading ? "در حال ذخیره..." : "ذخیره"}
            </button>

            <button
              type="button"
              onClick={cancelEdit}
              disabled={loading}
              className="bg-dark/5 dark:bg-light/5 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
            >
              <LuX size={14} />
              انصراف
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setEditing(true)}
              disabled={loading}
              className="bg-dark/5 dark:bg-light/5 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
            >
              <LuPencil size={14} />
              ویرایش
            </button>

            {comment.status === "approved" && (
              <button
                type="button"
                onClick={() => setReplying((value) => !value)}
                disabled={loading || replyLoading}
                className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                <LuReply size={14} />
                {replying ? "بستن پاسخ" : "پاسخ"}
              </button>
            )}

            {comment.status !== "approved" && (
              <button
                type="button"
                onClick={() => updateStatus("approved")}
                disabled={loading}
                className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                <LuCheck size={14} />
                تأیید
              </button>
            )}

            {comment.status !== "rejected" && (
              <button
                type="button"
                onClick={() => updateStatus("rejected")}
                disabled={loading}
                className="bg-alert/10 text-alert flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                <LuX size={14} />
                رد
              </button>
            )}

            {comment.status !== "pending" && (
              <button
                type="button"
                onClick={() => updateStatus("pending")}
                disabled={loading}
                className="bg-warning/10 text-warning flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                <LuRefreshCw size={14} />
                بررسی مجدد
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}
