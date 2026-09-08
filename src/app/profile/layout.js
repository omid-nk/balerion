import Image from "next/image";

import ProfileNav from "@/components/profile/ProfileNav";
import ProfileLogout from "@/components/profile/ProfileLogout";

import { LuShieldCheck } from "react-icons/lu";

import { createClient } from "@/lib/supabase/server";

export default async function ProfileLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, username, avatar_url, role")
    .eq("id", user.id)
    .single();

  const fullName = profile?.full_name || profile?.username || "کاربر";
  const email = user.email || "";
  const isAdmin = profile?.role === "admin";

  return (
    <main className="flex flex-col gap-4 lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full shrink-0 p-4 lg:w-64">
        {/* User */}
        <div className="border-border mb-5 border-b pb-5">
          <div className="flex items-center gap-3 px-2">
            {/* Avatar */}
            <div
              className={`ring-offset-light dark:ring-offset-dark relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-offset-2 ${
                isAdmin ? "ring-primary" : "ring-gray-300 dark:ring-gray-700"
              }`}
            >
              <Image
                src={profile?.avatar_url || "/images/panel/avatar-default.jpg"}
                alt={fullName}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>

            {/* User info */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="truncate font-bold">{fullName}</h2>

                {isAdmin && (
                  <div className="group relative flex shrink-0">
                    <LuShieldCheck className="text-primary size-4" />

                    <span className="bg-dark text-light dark:bg-light dark:text-dark pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 scale-95 rounded-lg px-2.5 py-1.5 text-xs whitespace-nowrap opacity-0 shadow-lg transition-all duration-150 group-hover:scale-100 group-hover:opacity-100">
                      کاربر ادمین است
                    </span>
                  </div>
                )}
              </div>

              <p
                dir="ltr"
                className="text-dark/50 dark:text-light/50 mt-1 truncate text-xs"
              >
                {email}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ProfileNav />

        {/* Logout */}
        <div className="border-border mt-4 border-t pt-4">
          <ProfileLogout />
        </div>
      </aside>

      {/* Content */}
      <section className="border-border bg-light dark:bg-dark min-w-0 flex-1 rounded-2xl border p-5 md:p-8">
        {children}
      </section>
    </main>
  );
}
