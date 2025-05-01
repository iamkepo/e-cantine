"use server";

export const GET = async (req: Request) => {
  console.log(req);
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return new Response(JSON.stringify(data));
};

export const POST = async (req: Request) => {
  console.log(req);
  return new Response("Hello");
};

export const PUT = async (req: Request) => {
  console.log(req);
  return new Response("Hello");
};

export const DELETE = async (req: Request) => {
  console.log(req);
  return new Response("Hello");
};

export const PATCH = async (req: Request) => {
  console.log(req);
  return new Response("Hello");
};