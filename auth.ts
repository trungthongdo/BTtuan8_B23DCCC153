import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    GitHub,

    Credentials({
      name: "Email va mat khau",

      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Mat khau",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        // Kiểm tra tài khoản admin trước
        if (
          email === process.env.DEMO_ADMIN_EMAIL &&
          password === process.env.DEMO_ADMIN_PASSWORD
        ) {
          return {
            id: "demo-admin-1",
            name: "Admin TechStore",
            email,
            role: "admin",
          };
        }

        // Kiểm tra tài khoản user thông thường
        if (
          email === process.env.DEMO_USER_EMAIL &&
          password === process.env.DEMO_USER_PASSWORD
        ) {
          return {
            id: "demo-user-1",
            name: "Nguoi dung thu nghiem",
            email,
            role: "user",
          };
        }

        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role ?? "user";
      } else {
        token.role ??= "user";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role === "admin" ? "admin" : "user";
      }

      return session;
    },
  },
});
