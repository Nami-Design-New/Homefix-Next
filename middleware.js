import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export function middleware(req) {
  const res = intlMiddleware(req);
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = [
    "/order-service",
    "/notifications",
    "/edit-profile",
    "/my-orders",
    "/aboutus",
  ];

  const pathname = req.nextUrl.pathname;
  console.log("The pathname:", pathname);

  const normalizedPathname = pathname.replace(/^\/(ar|en)(\/|$)/, "/");
  console.log("Normalized pathname:", normalizedPathname);

  if (protectedRoutes.includes(normalizedPathname) && !token) {
    res.headers.set("x-authenticated", "false");
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    res.headers.set("x-authenticated", "true");
  }

  return res;
}

export const config = {
  matcher: ["/", "/(ar|en)/:path*"],
};
