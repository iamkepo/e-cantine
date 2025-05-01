"use server";

import { NextResponse } from "next/server";

export const middleware = async (req: Request) => {
  console.log(req.url);
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log(token);
  if (req.url.includes("/api/auth/login")) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL("/login", req.url));
};

export const config = {
  matcher: "/api/auth/:path*",
};