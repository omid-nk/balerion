import { createClient } from "@/lib/supabase/client";

export async function getCategories() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .order("name", {
      ascending: true,
    });

  if (error) {
    console.error("Get categories error:", error);

    throw new Error(error.message || "دریافت دسته‌بندی‌ها با خطا مواجه شد.");
  }

  return data ?? [];
}
