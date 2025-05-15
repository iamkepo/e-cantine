import jwt from "jsonwebtoken";

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