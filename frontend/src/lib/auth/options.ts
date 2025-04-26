import CredentialsProvider from "next-auth/providers/credentials"
import { NextAuthOptions } from "next-auth"
import { login } from "@/services/auth"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
      },
      async authorize(credentials) {
        const { data } = await login(credentials?.username ?? "")
        const user = data.user
        return { id: user.id, name: user.username, token: data.token }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.token = user.token
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        token: token.token,
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  debug: process.env.NODE_ENV !== "production",
}
