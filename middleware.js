import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(req) {
  const res = intlMiddleware(req);

  const token = req.cookies.get("token");
  const { pathname, searchParams } = req.nextUrl;
  const locale = pathname.split("/")[1];
  console.log("locale :", locale);

  const protectedRoutes = [
    "/notifications",
    "/edit-profile",
    "/my-orders",
    "/settings",
    "/order-service",
  ].map((route) => `/${locale}${route}`);

  const normalizedPathname = pathname.replace(/\/$/, "");

  if (protectedRoutes.some((route) => normalizedPathname.startsWith(route))) {
    if (!token) {
      const homeUrl = new URL(`/${locale}/`, req.url);
      console.log("homeUrl :", homeUrl);

      homeUrl.searchParams.set("authModal", "true");

      return NextResponse.redirect(homeUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
