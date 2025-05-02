"use server";

export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);
  return new Response(JSON.stringify(body));
};