/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const generateToken = (user: any) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return token;
};

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  return decoded;
};