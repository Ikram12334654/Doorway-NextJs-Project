// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import enums from "./utils/enums";
// import env from "./utils/config";

// const publicRoutes = ["/login", "/register"];

// const personalRoutes = [
//   "/personal/home",
//   "/personal/design",
//   "/personal/account",
// ];

// const organizationRoutes = [
//   "/organization/home",
//   "/organization/design",
//   "/organization/account",
// ];

// export function middleware(req: NextRequest) {
//   const token = req.cookies.get("accessToken")?.value || "samiullah";
//   const accountType =
//     req.cookies.get("accountType")?.value || enums.ACCOUNT_TYPE.PERSONAL;
//   const steps = parseInt(req.cookies.get("steps")?.value || "0", 10) || 3;
//   const url = req.nextUrl.clone();

//   const normalizedPath = url.pathname.endsWith("/")
//     ? url.pathname.slice(0, -1)
//     : url.pathname;

//   if (
//     url.pathname.startsWith("/_next") ||
//     url.pathname.startsWith("/api") ||
//     url.pathname.includes(".")
//   ) {
//     return NextResponse.next();
//   }

//   if (publicRoutes.includes(normalizedPath)) {
//     return NextResponse.next();
//   }

//   const baseUrl = env.APP_URL;

//   const redirectTo = (path: string) => {
//     const absoluteUrl = new URL(path, baseUrl).toString();
//     return NextResponse.redirect(absoluteUrl);
//   };

//   if (!token) {
//     return redirectTo("/login");
//   }

//   if (accountType === enums.ACCOUNT_TYPE.PERSONAL) {
//     if (steps < 2) {
//       return redirectTo("/register");
//     }
//     if (!normalizedPath.startsWith("/personal")) {
//       return redirectTo("/personal/home");
//     }
//   }

//   if (accountType === enums.ACCOUNT_TYPE.ORGANIZATION) {
//     if (steps < 2) {
//       return redirectTo("/register");
//     }
//     if (!normalizedPath.startsWith("/organization")) {
//       return redirectTo("/organization/home");
//     }
//   }

//   return NextResponse.next();
// }
