"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import CommentAdminItem from "./CommentAdminItem";

const filters = [
  {
    value: "all",
    label: "همه",
  },
  {
    value: "pending",
    label: "در انتظار بررسی",
  },
  {
    value: "approved",
    label: "تأیید شده",
  },
  {
    value: "rejected",
    label: "رد شده",
  },
  {
    value: "spam",
    label: "اسپم",
  },
];

export default function CommentsManagement({
  comments: initialComments,
  currentUserId,
  counts,
  page,
  totalPages,
  status,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  function handleFilterChange(newStatus) {
    const params = new URLSearchParams();

    params.set("page", "1");

    if (newStatus !== "all") {
      params.set("status", newStatus);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }

    const params = new URLSearchParams();

    params.set("page", String(newPage));

    if (status !== "all") {
      params.set("status", status);
    }

    router.push(`${pathname}?${params.toString()}`);
  }

  function handleCommentUpdate(updatedComment) {
    setComments((current) =>
      current.map((comment) =>
        comment.id === updatedComment.id
          ? {
              ...comment,
              ...updatedComment,
            }
          : comment,
      ),
    );
  }

  function handleAddReply() {
    router.refresh();
  }

  return (
    <section>
      <div className="mb-6">
        <h1 className="font-morabba text-xl font-bold sm:text-2xl">
          مدیریت نظرات
        </h1>

        <p className="text-dark/50 dark:text-light/50 mt-2 text-sm">
          نظرات کاربران را بررسی، ویرایش و مدیریت کنید.
        </p>
      </div>

      <div className="bg-light dark:bg-dark mb-6 flex flex-wrap gap-2 rounded-xl p-2">
        {filters.map((item) => {
          const active = status === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => handleFilterChange(item.value)}
              className={`rounded-lg px-3 py-2 text-xs transition-colors sm:text-sm ${
                active
                  ? "bg-primary text-white"
                  : "text-dark/60 dark:text-light/60 hover:bg-dark/5 dark:hover:bg-light/5"
              }`}
            >
              {item.label}

              <span className="mr-1.5 opacity-70">({counts[item.value]})</span>
            </button>
          );
        })}
      </div>

      {comments.length > 0 ? (
        <>
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentAdminItem
                key={comment.id}
                comment={comment}
                currentUserId={currentUserId}
                onUpdate={handleCommentUpdate}
                onAddReply={handleAddReply}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(page - 1)}
                disabled={page <= 1}
                className="bg-light dark:bg-dark rounded-lg px-3 py-2 text-xs transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
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
                            : "bg-light dark:bg-dark text-dark/60 dark:text-light/60 hover:bg-dark/5 dark:hover:bg-light/5"
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
                className="bg-light dark:bg-dark rounded-lg px-3 py-2 text-xs transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
              >
                بعدی
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="border-dark/10 dark:border-light/10 text-dark/50 dark:text-light/50 rounded-xl border border-dashed p-10 text-center text-sm">
          نظری در این بخش وجود ندارد.
        </div>
      )}
    </section>
  );
}
