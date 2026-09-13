"use client";

import { usePathname, useRouter } from "next/navigation";
import { LuMessageCircle } from "react-icons/lu";

import { buildCommentTree } from "@/lib/comments";

import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

export default function CommentsSection({
  comments,
  courseId,
  page,
  totalPages,
  total,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const commentTree = buildCommentTree(comments);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams();

    params.set("page", String(newPage));

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <section className="bg-light dark:bg-dark mt-4 rounded-xl p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
            <LuMessageCircle size={20} />
          </div>

          <div>
            <h2 className="font-morabba text-base font-bold sm:text-lg">
              نظرات کاربران
            </h2>

            <p className="text-dark/50 dark:text-light/50 mt-1 text-xs">
              نظر خودت درباره این دوره رو با بقیه به اشتراک بذار
            </p>
          </div>
        </div>

        <span className="text-dark/50 dark:text-light/50 text-sm">
          {total} نظر
        </span>
      </div>

      <CommentForm courseId={courseId} />

      {commentTree.length > 0 ? (
        <>
          <div className="mt-7 space-y-5">
            {commentTree.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                courseId={courseId}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="bg-background dark:bg-dark/50 rounded-lg px-3 py-2 text-xs transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
              >
                قبلی
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1)
                .filter((pageNumber) => {
                  if (totalPages <= 7) {
                    return true;
                  }

                  return (
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    Math.abs(pageNumber - page) <= 1
                  );
                })
                .map((pageNumber, index, visiblePages) => {
                  const previousPage = visiblePages[index - 1];

                  const showDots =
                    previousPage && pageNumber - previousPage > 1;

                  return (
                    <div key={pageNumber} className="flex items-center gap-2">
                      {showDots && (
                        <span className="text-dark/40 dark:text-light/40 px-1 text-xs">
                          ...
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handlePageChange(pageNumber)}
                        className={`rounded-lg px-3 py-2 text-xs transition-colors ${
                          pageNumber === page
                            ? "bg-primary text-white"
                            : "bg-background dark:bg-dark/50 text-dark/60 dark:text-light/60 hover:bg-dark/5 dark:hover:bg-light/5"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    </div>
                  );
                })}

              <button
                type="button"
                onClick={() => handlePageChange(page + 1)}
                disabled={page >= totalPages}
                className="bg-background dark:bg-dark/50 rounded-lg px-3 py-2 text-xs transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
              >
                بعدی
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="border-dark/10 text-dark/50 dark:border-light/10 dark:text-light/50 mt-7 rounded-xl border border-dashed p-8 text-center text-sm">
          هنوز نظری برای این دوره ثبت نشده است.
          <br />
          اولین نفری باش که نظرت رو می‌نویسه.
        </div>
      )}
    </section>
  );
}
