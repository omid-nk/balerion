import { createClient } from "@/lib/supabase/server";

import SettingsForm from "@/components/profile/settings/SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-xl font-bold">تنظیمات حساب</h1>

        <p className="text-dark/50 dark:text-light/50 mt-2 text-sm">
          اطلاعات حساب و تنظیمات امنیتی خود را مدیریت کنید.
        </p>
      </div>

      <SettingsForm
        email={user.email || ""}
        username={profile?.username || ""}
        avatarUrl={profile?.avatar_url || ""}
      />
    </div>
  );
}
