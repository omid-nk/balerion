import { createClient } from "@/lib/supabase/server";

import CategoriesListClient from "./CategoriesListClient";

export default async function CategoriesListServer() {
  const supabase = await createClient();

  const { data, error } = await supabase.from("categories").select("*");

  if (error) {
    console.error(error);
    return null;
  }

  return <CategoriesListClient categories={data} />;
}
