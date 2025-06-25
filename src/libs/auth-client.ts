import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  // Configuration des routes API
  endpoints: {
    signIn: '/api/v1/auth/signin',
    signUp: '/api/v1/auth/signup',
    signOut: '/api/v1/auth/signout',
    session: '/api/v1/auth/session',
    csrf: '/api/v1/auth/csrf',
    callback: '/api/v1/auth/callback',
    verifyRequest: '/api/v1/auth/verify-request',
    error: '/api/v1/auth/error',
  },
  // Configuration des cookies
  cookies: {
    sessionToken: '__Secure-next-auth.session-token',
    callbackUrl: '__Secure-next-auth.callback-url',
    csrfToken: '__Host-next-auth.csrf-token',
  },
  // Activer le rafraîchissement automatique de session
  autoRefresh: true,
  // Activer le débogage en développement
  debug: process.env.NODE_ENV === 'development',
});

export const { signIn, signOut, signUp, useSession } = authClient;