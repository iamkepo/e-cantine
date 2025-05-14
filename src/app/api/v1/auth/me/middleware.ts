/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const middleware = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  jwt.verify(token as string, (process.env.ACCESS_TOKEN_SECRET as string), (err: any, user: any) => {
    if (err) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    req.headers.set("user", JSON.stringify(user));
    return NextResponse.next();
  });
};

export const config = {
  matcher: "/api/v1/auth/me/:path*",
};
