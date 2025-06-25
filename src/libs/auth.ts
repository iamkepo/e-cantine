/* eslint-disable @typescript-eslint/no-explicit-any */
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
 

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {  
    enabled: true,
    async sendResetPassword(data: any, request: any) {
      console.log(request);
      
      // Implémentez l'envoi d'email de réinitialisation ici
      console.log('Reset password requested for:', data.email);
      console.log('Reset token:', data.token);
      // Exemple avec un service d'email comme Resend ou Nodemailer
    },
    async sendVerificationRequest(data: any) {
      // Implémentez l'envoi d'email de vérification ici
      console.log('Verification requested for:', data.email);
      console.log('Verification token:', data.token);
    },
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 jours
    updateAge: 24 * 60 * 60, // 24 heures
  },
  callbacks: {
    async session({ session, user }: any) {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});