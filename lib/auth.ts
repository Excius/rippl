import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { encode } from "next-auth/jwt";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "./prisma";

// NOTE: Comment out while deploying
// import { PrismaClient } from "@prisma/client";
// import { PrismaNeon } from "@prisma/adapter-neon";

// Extend NextAuth User type to include 'username'
declare module "next-auth" {
  interface User {
    username?: string;
  }
}

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(6).max(20),
});

// NOTE: Comment out while deploying
// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaNeon({ connectionString });
// const prisma = new PrismaClient({ adapter });

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const parsed = credentialsSchema.safeParse(credentials);
          if (!parsed.success) {
            console.log("Validation failed:", parsed.error);
            return null;
          }

          const { email, password } = parsed.data;

          const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
          });

          if (!user) {
            console.log("User not found:", email);
            return null;
          }

          if (!user.password) {
            console.log("User has no password set:", email);
            return null;
          }

          const isValid = await compare(password, user.password);
          if (!isValid) {
            console.log("Invalid password for user:", email);
            return null;
          }

          console.log("User authenticated successfully:", email);
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "database",
    updateAge: 24 * 60 * 60, // 24 hours
    maxAge: 7 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
    async session({ session, user }) {
      session.user = {
        id: user.id,
        email: user.email,
        username: user.username as string,
        name: user.name,
        image: user.image,
        emailVerified: user.emailVerified,
      };
      return session;
    },
  },
  events: {
    async signIn({ isNewUser, user, account }) {
      if (isNewUser && account?.provider !== "credentials") {
        console.log("New user sign-in:", user.email);
      }
    },
  },
  jwt: {
    encode: async function (params) {
      if (params.token?.credentials) {
        const sessionToken = crypto.randomUUID();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }

        const createdSession = await PrismaAdapter(prisma).createSession?.({
          sessionToken: sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        });
        console.log("Session created:", createdSession);

        if (!createdSession) {
          throw new Error("Failed to create session");
        }

        return sessionToken;
      }
      return encode(params);
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
    newUser: "/auth/newUser",
  },
  // debug: process.env.NODE_ENV === "development",
});
