import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const excludedPaths = [
  "/api/user/login",
  "/api/user/reset-password",
  "/api/user/forgotpassword",
  "/api/user/signup",
];

// Add secret key for JWT
const secret = process.env.NEXTAUTH_SECRET;

if (!secret) {
  throw new Error("NEXTAUTH_SECRET environment variable is not defined");
}

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const url = req.nextUrl.clone();
  if (excludedPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const hostname = req.headers.get("host") || "";

  // Check if the request is for the admin page and the hostname is admin.forbio.ai
  if (pathname.startsWith("/admin") && hostname !== "admin.forbio.ai:3000") {
    return NextResponse.redirect(new URL("http://forbio.ai:3000"));
  }

  const token = await getToken({
    req,
    secret,
  });
  // Check if the token exists in the cookies
  if (token) {
    if (token.role === 1) {
      if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL("http://admin.forbio.ai:3000/admin/management")
        );
      }
    } else {
      if (pathname.startsWith("/admin")) {
        url.pathname = "/main";
        return NextResponse.redirect(url);
      } else {
        return NextResponse.next();
      }
    }
  } else {
    // If the token does not exist, redirect to '/'

    if (url.pathname.startsWith("/api")) 
    {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized: No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    } else if (url.pathname === "/admin") {
      return NextResponse.next();
    } else if (url.pathname.startsWith("/admin/")) {
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }
}

// Specify the paths for the middleware to intercept
export const config = {
  matcher: [
    "/main/:path*",
    "/detail/:path*",
    "/api/user/:path*",
    "/api/admin/:path*",
    "/admin/:path*",
  ],
};
