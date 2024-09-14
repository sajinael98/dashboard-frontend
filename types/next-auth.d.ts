import { Session as AuthSession } from "next-auth";
import type { DefaultUser } from "next-auth";
import NextAuth from "next-auth/next";

import { User as AuthUser } from "next-auth";

declare module "next-auth" {
  interface Session extends AuthSession {
    user: DefaultUser & {
      token: string;
      roles: string[];
      permissions: string[];
    };
  }
}
