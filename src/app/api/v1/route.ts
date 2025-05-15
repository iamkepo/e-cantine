"use server";

import swaggerSpec from '@/libs/swagger';

export const GET = async () => {
  return new Response(JSON.stringify(swaggerSpec), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};