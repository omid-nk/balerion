"use client";

import Image from "next/image";
import { useState } from "react";
import { LuCornerDownLeft } from "react-icons/lu";

import CommentForm from "./CommentForm";

export default function CommentItem({ comment, courseId, isReply = false }) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const profile = comment.profiles;

  const displayName = profile?.full_name || profile?.username || "کاربر";

  const canReply = comment.status === "approved";

  return (
    <div className={isReply ? "mr-6 sm:mr-10" : ""}>
      <article className="border-dark/10 bg-background dark:border-light/10 dark:bg-dark/50 rounded-xl border p-4">
        <div className="flex items-start gap-3">
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

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-sm font-bold">{displayName}</span>

              <span className="text-dark/40 dark:text-light/40 text-[11px]">
                {new Date(comment.created_at).toLocaleDateString("fa-IR")}
              </span>
            </div>

            <p className="text-dark/70 dark:text-light/70 mt-3 text-sm leading-7">
              {comment.content}
            </p>

            {!isReply && canReply && (
              <button
                type="button"
                onClick={() => setShowReplyForm((prev) => !prev)}
                className="text-primary mt-3 flex items-center gap-1.5 text-xs transition-opacity hover:opacity-70"
              >
                <LuCornerDownLeft size={14} />

                {showReplyForm ? "بستن پاسخ" : "پاسخ"}
              </button>
            )}
          </div>
        </div>
      </article>

      {showReplyForm && canReply && (
        <div className="mt-3">
          <CommentForm
            courseId={courseId}
            parentId={comment.id}
            replyTo={displayName}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-3 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              courseId={courseId}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}
