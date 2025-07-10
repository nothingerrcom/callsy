import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { addUser, findUser } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, password, email } = body;

        if (!username || !password || !email) {
            return NextResponse.json(
                { error: "Tüm alanlar zorunludur" },
                { status: 400 }
            );
        }

        const existingUser = findUser(username);
        if (existingUser) {
            return NextResponse.json(
                { error: "Bu kullanıcı adı zaten kullanılıyor" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        addUser({
            username,
            password: hashedPassword,
            email
        });

        return NextResponse.json({ message: "Kullanıcı başarıyla oluşturuldu" });
    } catch (error) {
        console.error("Kayıt hatası:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu" },
            { status: 500 }
        );
    }
} 