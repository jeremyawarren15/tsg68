import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient;

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (!user.email) return false;

      const emailWhitelisted = await prisma.emailWhitelist.findFirst({
        where: {
          email: user.email as string
        }
      });

      return !!emailWhitelisted;
    },
  }
})