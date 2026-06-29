import CategoriesListClient from "./CategoriesListClient";
import { createClient } from "@/lib/supabase/server";

export default async function CategoriesListServer() {
  const supabase = await createClient();

  const { data } = await supabase.from("categories").select("*");

  return <CategoriesListClient categories={data || []} />;
}
