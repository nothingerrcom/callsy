import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import type { NextAuthOptions } from "next-auth"

export const authConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        }),
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return `${baseUrl}/rooms`
        }
    }
} satisfies NextAuthOptions