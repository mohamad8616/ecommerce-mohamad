import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { phoneNumber } from "better-auth/plugins";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    nextCookies(),
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, request) => {
        // Implement sending OTP code via SMS
      },
    }),
  ], //
});
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
