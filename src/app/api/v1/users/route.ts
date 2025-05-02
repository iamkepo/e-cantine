"use server";

export const GET = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log(token);
  return new Response(JSON.stringify({token}));
};