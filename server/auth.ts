import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/server"
 
export const { handlers, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    Github({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
    })
],
})