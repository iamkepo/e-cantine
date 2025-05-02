"use server";


export const GET = async (req: Request) => {
  const token = req.headers.get("Authorization")?.split(" ")[1];
  console.log(token);
  // TODO: check credentials
  // TODO: generate token
  // TODO: store token in cookie  
  
  return new Response(JSON.stringify(token));
};