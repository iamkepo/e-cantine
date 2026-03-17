/**
 * Better Auth Handler
 * Routes all better-auth operations (2FA, sessions, etc.) through /api/v1/auth/better/**
 * 
 * Your existing JWT-based endpoints remain at:
 * - POST /api/v1/auth/login
 * - POST /api/v1/auth/login/admin
 * - POST /api/v1/auth/register
 * - POST /api/v1/auth/refresh
 * - GET /api/v1/auth/me
 */

import { auth } from "@/lib/auth";

const handler = auth.handler;

export const POST = handler;
export const GET = handler;

