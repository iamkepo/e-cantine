"use server";

// import { getUserByEmail } from "@/lib/db";
// import { generateToken } from "@/lib/jwt";

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);
  // TODO: check credentials
  // TODO: generate token
  // TODO: store token in cookie  
  
  return new Response(JSON.stringify(body));
};