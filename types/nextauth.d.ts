import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

type UserId = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    role: Role;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: Role;
    };
  }
}
