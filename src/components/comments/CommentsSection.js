"use client";

import { useEffect, useState } from "react";
import { LuLockKeyhole, LuMessageCircle } from "react-icons/lu";

import { createClient } from "@/lib/supabase/client";
import { buildCommentTree } from "@/lib/comments";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Pagination from "@/components/shared/Pagination";

export default function CommentsSection({
  comments,
  courseId,
  page,
  totalPages,
  total,
}) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
    });
  }, []);

  if (user === undefined) {
    return null;
  }

  const commentTree = buildCommentTree(comments);

  return (
    <section className="bg-light dark:bg-dark mt-4 rounded-xl p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
            {user ? <LuMessageCircle size={20} /> : <LuLockKeyhole size={18} />}
          </div>

          <div>
            <h2 className="font-morabba text-base font-bold sm:text-lg">
              نظرات کاربران
            </h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              {user
                ? "نظر خودت درباره این دوره رو با بقیه به اشتراک بذار"
                : "برای مشاهده و ثبت نظر وارد حساب کاربری شوید"}
            </p>
          </div>
        </div>

        {user && (
          <span className="text-dark/50 dark:text-light/50 text-sm">
            {total} نظر
          </span>
        )}
      </div>

      {!user ? (
        <div className="border-dark/10 dark:border-light/10 text-dark/50 dark:text-light/50 rounded-xl border border-dashed p-8 text-center text-sm">
          برای مشاهده نظرات و ثبت نظر
          <br />
          ابتدا وارد حساب کاربری خود شوید.
        </div>
      ) : (
        <>
          <CommentForm courseId={courseId} />

          {commentTree.length > 0 ? (
            <>
              <div className="border-border mt-7 space-y-5 *:border-b last:border-0">
                {commentTree.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    courseId={courseId}
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                className="mt-7"
                variant="course"
              />
            </>
          ) : (
            <div className="border-dark/10 text-dark/50 dark:border-light/10 dark:text-light/50 mt-7 rounded-xl border border-dashed p-8 text-center text-sm">
              هنوز نظری برای این دوره ثبت نشده است.
              <br />
              اولین نفری باش که نظرت رو می‌نویسه.
            </div>
          )}
        </>
      )}
    </section>
  );
}
