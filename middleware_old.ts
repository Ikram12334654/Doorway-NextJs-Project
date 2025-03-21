import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import enums from "./utils/enums";

const routes = {
  public: ["/login", "/register"],
  personal: "/personal/home",
  organization: "/organization/home",
};

export function middleware(req: NextRequest) {
  const userRole = req.cookies.get("userRole")?.value;
  const accountType = req.cookies.get("accountType")?.value;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const url = req.nextUrl.clone();
  const normalizedPath = url.pathname.endsWith("/")
    ? url.pathname.slice(0, -1)
    : url.pathname;

  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken) {
    if (!routes.public.includes(normalizedPath)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  if (routes.public.includes(normalizedPath)) {
    return NextResponse.redirect(new URL(routes.personal, req.url));
  }

  if (normalizedPath === "/home") {
    switch (userRole) {
      case enums.ROLES[1]:
        return NextResponse.redirect(new URL(routes.personal, req.url));
      case enums.ROLES[2]:
        return NextResponse.redirect(new URL(routes.organization, req.url));
      default:
        return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}
