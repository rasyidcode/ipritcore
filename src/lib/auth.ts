import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "demo@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "demo",
        },
      },
      async authorize(credentials, _req) {
        try {
          const user = await prisma.user.findFirst({
            where: { email: credentials?.email as string },
          });

          if (user && credentials?.password !== undefined) {
            if (await bcrypt.compare(credentials.password, user.password)) {
              const authUser = {
                id: String(user.id),
                name: user.name,
                email: user.email,
              };

              return authUser;
            }
          }

          return null;
        } catch (error) {
          console.log(error);

          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    async session({ session }) {
      try {
        if (!session.user?.email) {
          throw new Error("User email undefined");
        }

        const currentUser = await prisma.user.findFirst({
          where: {
            email: session.user?.email,
          },
        });

        if (!currentUser) {
          throw new Error("Current user undefined");
        }

        session.user.id = currentUser.id;

        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        if (!user?.email || !user?.name) {
          throw new Error(`Sign in error: ${user} not return anything`);
        }

        const userData = await prisma.user.findFirst({
          where: { email: user.email as string },
        });
        if (!userData) {
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name as string,
              image: user.image as string,
            },
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
} satisfies NextAuthOptions;
