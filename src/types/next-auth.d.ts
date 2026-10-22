import type { DefaultSession } from "next-auth";
import "next-auth";
import "next-auth/jwt";

export type UserRole = "user" | "admin";

declare module "next-auth" {
  interface User {
    role?: UserRole;
  }

  interface Session {
    user: {
      role: UserRole;
    } & NonNullable<DefaultSession["user"]>;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
