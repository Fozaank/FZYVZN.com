import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials?.password === process.env.NEXTAUTH_PASSWORD) {
          return { id: "1", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  // Add this 'pages' block
  pages: {
    signIn: "/locked",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
