import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  /*
   * --------------------------------------------------
   * Auth routes
   * --------------------------------------------------
   */

  const isAuthRoute = pathname === "/login" || pathname === "/register";

  /*
   * --------------------------------------------------
   * Profile routes
   * --------------------------------------------------
   */

  const isProtectedRoute =
    pathname === "/profile" ||
    pathname.startsWith("/profile/") ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/");

  /*
   * --------------------------------------------------
   * Admin routes
   * --------------------------------------------------
   *
   * Dashboard itself is NOT admin-only.
   *
   * Only management sections are.
   */

  const isAdminRoute =
    pathname === "/profile/courses" ||
    pathname.startsWith("/profile/courses/") ||
    pathname === "/profile/categories" ||
    pathname.startsWith("/profile/categories/") ||
    pathname === "/profile/users" ||
    pathname.startsWith("/profile/users/") ||
    pathname === "/profile/comments/manage" ||
    pathname.startsWith("/profile/comments/manage/") ||
    pathname === "/profile/orders" ||
    pathname.startsWith("/profile/orders/");

  /*
   * --------------------------------------------------
   * Logged-in users
   * cannot access login/register
   * --------------------------------------------------
   */

  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /*
   * --------------------------------------------------
   * Logged-out users
   * cannot access profile
   * --------------------------------------------------
   */

  if (!user && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  /*
   * --------------------------------------------------
   * Admin-only routes
   * --------------------------------------------------
   */

  if (user && isAdminRoute) {
    const { data: isAdmin, error } = await supabase.rpc("is_admin");

    if (error || !isAdmin) {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }

  return supabaseResponse;
}
