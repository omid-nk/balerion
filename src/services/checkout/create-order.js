import { createClient } from "@/lib/supabase/server";

export async function createOrder(courseIds) {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw userError;
  }

  if (!user) {
    const error = new Error("AUTH_REQUIRED");
    error.code = "AUTH_REQUIRED";
    throw error;
  }

  const { data, error } = await supabase.rpc("create_order_from_courses", {
    p_course_ids: courseIds,
  });

  if (error) {
    console.error("createOrder:", error);
    throw error;
  }

  return data;
}
