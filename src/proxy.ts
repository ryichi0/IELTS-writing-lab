import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const AUTH_PAGES = ["/login", "/sign-up"];
const PUBLIC_EXACT = ["/", "/dashboard"];
const PUBLIC_PREFIX = ["/learn", "/topics", "/api/cron"];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (list) => {
          list.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          list.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // فقط وقتی کوکی نشست هست از Supabase می‌پرسیم.
  // مهمان‌ها هیچ تماس شبکه‌ای ایجاد نمی‌کنند.
  const hasSessionCookie = request.cookies
    .getAll()
    .some((c) => c.name.startsWith("sb-"));

  let isLoggedIn = false;
  if (hasSessionCookie) {
    // getClaims توکن را روی خود سرور اپ تأیید می‌کند و در حالت عادی تماس شبکه‌ای ندارد
    const { data } = await supabase.auth.getClaims();
    isLoggedIn = Boolean(data?.claims);
  }

  const { pathname, search } = request.nextUrl;

  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isPublic =
    isAuthPage ||
    PUBLIC_EXACT.includes(pathname) ||
    PUBLIC_PREFIX.some((p) => pathname === p || pathname.startsWith(p + "/"));

  // لاگین‌نکرده روی صفحه‌ی خصوصی
  if (!isLoggedIn && !isPublic) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    url.searchParams.set("next", pathname + search);
    return NextResponse.redirect(url);
  }

  // لاگین‌کرده روی صفحه‌ی ورود یا ثبت‌نام
  if (isLoggedIn && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};