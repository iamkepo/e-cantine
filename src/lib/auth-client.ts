import { createAuthClient } from "better-auth/react";

/**
 * Better Auth React Client
 * Provides hooks and methods for authentication:
 * - signIn.email() - Sign in with email/password
 * - signUp.email() - Register with email/password
 * - signOut() - Sign out
 * - useSession() - Get current session
 * - useTwoFactor() - Manage 2FA
 * - signIn.google() - OAuth with Google
 * - signIn.github() - OAuth with GitHub
 * - signIn.discord() - OAuth with Discord
 */
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  basePath: "/api/v1/auth/better",
  fetchOptions: {
    credentials: "include", // Include cookies in requests
  },
});

export const { useSession, signOut } = authClient;


