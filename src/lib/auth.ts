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
                console.log("Giriş denemesi:", credentials?.username);

                if (!credentials?.username || !credentials?.password) {
                    console.log("Kimlik bilgileri eksik");
                    return null;
                }

                const user = await findUser(credentials.username);
                console.log("Bulunan kullanıcı:", user ? "var" : "yok");

                if (!user) {
                    console.log("Kullanıcı bulunamadı");
                    return null;
                }

                try {
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    console.log("Şifre kontrolü:", isValid ? "başarılı" : "başarısız");

                    if (!isValid) {
                        console.log("Şifre yanlış");
                        return null;
                    }

                    const userToReturn = {
                        id: user.username,
                        name: user.username,
                        email: user.email
                    };
                    console.log("Giriş başarılı, dönen kullanıcı:", userToReturn);
                    return userToReturn;
                } catch (error) {
                    console.error("Şifre karşılaştırma hatası:", error);
                    return null;
                }
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