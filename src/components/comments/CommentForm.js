"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LuMessageSquareText, LuSend, LuX } from "react-icons/lu";

import { createClient } from "@/lib/supabase/client";

export default function CommentForm({
  courseId,
  parentId = null,
  replyTo = null,
  onCancel,
}) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const value = content.trim();

    if (!value) {
      toast.error("متن نظر را وارد کنید.");
      return;
    }

    if (value.length < 3) {
      toast.error("متن نظر خیلی کوتاه است.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error("برای ثبت نظر ابتدا وارد حساب کاربری شوید.");
        return;
      }

      const { error } = await supabase.from("comments").insert({
        author_id: user.id,
        course_id: courseId,
        parent_id: parentId,
        content: value,
      });

      if (error) {
        console.error(error);
        toast.error("ثبت نظر انجام نشد.");
        return;
      }

      setContent("");

      toast.success(
        parentId
          ? "پاسخ شما برای بررسی ارسال شد."
          : "نظر شما برای بررسی ارسال شد.",
      );

      onCancel?.();
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("خطایی رخ داد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-dark/10 bg-background dark:border-light/10 dark:bg-dark/50 rounded-xl border p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <LuMessageSquareText size={17} className="text-primary" />

            <span className="text-sm font-medium">
              {replyTo ? `پاسخ به ${replyTo}` : "نظر شما"}
            </span>
          </div>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="text-dark/40 dark:text-light/40 hover:text-dark dark:hover:text-light transition-colors"
              aria-label="بستن"
            >
              <LuX size={17} />
            </button>
          )}
        </div>

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={loading}
          rows={4}
          maxLength={2000}
          placeholder={
            replyTo
              ? `پاسخ خودت به ${replyTo} رو بنویس...`
              : "نظرت درباره این دوره چیه؟"
          }
          className="bg-light dark:bg-dark placeholder:text-dark/40 dark:placeholder:text-light/40 min-h-28 w-full resize-none rounded-xl border-0 p-4 text-sm outline-none"
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-dark/40 dark:text-light/40 text-[11px]">
            {content.length}/2000
          </span>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LuSend size={15} />

            {loading ? "در حال ارسال..." : "ارسال پاسخ"}
          </button>
        </div>
      </div>
    </form>
  );
}
