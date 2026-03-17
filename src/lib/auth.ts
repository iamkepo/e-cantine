/**
 * Better Auth Configuration for e-cantine
 * 
 * Now fully replaces JWT with better-auth sessions
 * - Email/password sign-in and sign-up
 * - HTTP-only session cookies
 * - 2FA/TOTP support
 * - Multi-session management
 * - OAuth: Google, GitHub, Discord
 */

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { twoFactor, multiSession } from "better-auth/plugins";
import { google, github, discord } from "better-auth/social-providers";
import { prisma } from "@/libs/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET || "change-me",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  basePath: "/api/v1/auth/better",
  appName: "e-cantine",
  
  // Enable email/password authentication
  emailAndPassword: {
    enabled: true,
  },
  
  plugins: [
    twoFactor({
      issuer: "e-cantine",
    }),
    multiSession(),
  ],

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      redirectURL: "/api/v1/auth/better/callback/google",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      redirectURL: "/api/v1/auth/better/callback/github",
    },
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      redirectURL: "/api/v1/auth/better/callback/discord",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
});

export type Session = typeof auth.$Infer.Session;


