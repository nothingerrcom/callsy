import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUser } from "./db";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";

interface Credentials {
    username: string;
    password: string;
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Kullanıcı Adı", type: "text" },
                password: { label: "Şifre", type: "password" },
            },
            async authorize(credentials): Promise<any> {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const user = await findUser(credentials.username);
                if (!user) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return {
                    id: user.username,
                    name: user.username,
                    email: user.email
                };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({ session, token }) {
            if (session?.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}; 