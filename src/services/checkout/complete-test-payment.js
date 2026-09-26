import { createClient } from "@/lib/supabase/server";

export async function completeTestPayment(orderId) {
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

  const { data, error } = await supabase.rpc("complete_test_payment", {
    p_order_id: orderId,
  });

  if (error) {
    console.error("completeTestPayment:", error);

    throw error;
  }

  return data;
}
