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

  if (isReply) {
    return (
      <div className="border-primary/15 mr-6 border-r-2 pr-4 sm:mr-10 sm:pr-5">
        {" "}
        <div className="flex items-start gap-3">
          {" "}
          <div className="bg-primary/10 relative size-8 shrink-0 overflow-hidden rounded-full">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={displayName}
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              <div className="text-primary flex size-full items-center justify-center text-xs font-bold">
                {displayName.charAt(0)}{" "}
              </div>
            )}{" "}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-xs font-bold">{displayName}</span>

              <span className="text-dark/40 dark:text-light/40 text-[10px]">
                {new Date(comment.created_at).toLocaleDateString("fa-IR")}
              </span>
            </div>

            <p className="text-dark/60 dark:text-light/60 mt-2 text-xs leading-6">
              {comment.content}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-border py-5 first:pt-0 last:border-b-0">
      {" "}
      <div className="flex items-start gap-3">
        {" "}
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
              {displayName.charAt(0)}{" "}
            </div>
          )}{" "}
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

          {canReply && (
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
        <div className="mt-4 space-y-4">
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
