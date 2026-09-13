import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getAllComments } from "@/services/comments";

import CommentsManagement from "@/components/profile/comments/CommentsManagement";

export const metadata = {
  title: "مدیریت نظرات",
};

export default async function CommentsManagePage({ searchParams }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: isAdmin, error } = await supabase.rpc("is_admin");

  if (error || !isAdmin) {
    redirect("/profile");
  }

  const params = await searchParams;

  const page = Math.max(1, Number(params?.page) || 1);

  const allowedStatuses = ["all", "pending", "approved", "rejected", "spam"];

  const status = allowedStatuses.includes(params?.status)
    ? params.status
    : "all";

  const result = await getAllComments({
    page,
    pageSize: 20,
    status,
  });

  return (
    <div className="min-w-0">
      <CommentsManagement
        comments={result.comments}
        currentUserId={user.id}
        counts={result.counts}
        page={result.page}
        totalPages={result.totalPages}
        status={status}
      />
    </div>
  );
}
