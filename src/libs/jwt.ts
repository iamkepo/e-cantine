/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

if (!process.env.ACCESS_TOKEN_SECRET) {
  throw new Error("ACCESS_TOKEN_SECRET is not defined");
}

if (!process.env.REFRESH_TOKEN_SECRET) {
  throw new Error("REFRESH_TOKEN_SECRET is not defined");
}

export function generateAccessToken(user: string | object) {
  return jwt.sign(user,( process.env.ACCESS_TOKEN_SECRET as string), { expiresIn: '15m' }); // Lower expiration for access token
}

export function generateRefreshToken(user: string | object) {
  return jwt.sign(user, (process.env.REFRESH_TOKEN_SECRET as string), { expiresIn: '1d' }); // Expiration set to 1 day for refresh token
}

export const middlewareToken = async (req: NextRequest) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  
  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  return jwt.verify(token as string, (process.env.ACCESS_TOKEN_SECRET as string), (err: any, user: any) => {
    if (err) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }
    return user;
  });
};