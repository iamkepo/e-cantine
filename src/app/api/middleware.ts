"use server";

import { NextResponse } from "next/server";
// import { decodeToken } from "@/lib/jwt";

export const middleware = async (req: Request) => {
  console.log(req);
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log(token);
  if (!token || token === "null") {
    console.log("No token");
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    console.log("Token");
    // const user = await decodeToken(token);
    // console.log(user);
    return NextResponse.next();
  }
};

export const config = {
  matcher: "/api/:path*",
};