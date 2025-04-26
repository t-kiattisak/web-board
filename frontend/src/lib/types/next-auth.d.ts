// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt"
import { DefaultSession } from "next-auth"

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    name?: string
    token?: string
  }
}

declare module "next-auth" {
  interface User {
    token?: string
  }
  interface Session {
    user: {
      id?: string
      name?: string
      token?: string
    } & DefaultSession["user"]
  }
}
