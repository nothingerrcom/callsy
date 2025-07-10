'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { generateRoomId } from '@/lib/room';

export default function RoomPage() {
    const router = useRouter();
    const [joinId, setJoinId] = useState<string>('');

    const createRoom = (): void => {
        const id = generateRoomId();
        router.push(`/room/${id}`);
    };

    const joinRoom = (): void => {
        if (joinId.length !== 6) {
            alert('Geçerli bir oda ID girin (6 karakter)');
            return;
        }
        router.push(`/room/${joinId}`);
    };

    const handleJoinIdChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setJoinId(e.target.value.toUpperCase());
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl mb-6">Sesli Oda Sistemi</h1>

            <button 
                onClick={createRoom} 
                className="bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
            >
                Oda Oluştur
            </button>

            <input
                value={joinId}
                onChange={handleJoinIdChange}
                placeholder="Oda ID Girin"
                className="border p-2 w-full mb-2 text-center uppercase tracking-widest"
                maxLength={6}
            />
            <button 
                onClick={joinRoom} 
                className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
                Odaya Katıl
            </button>
        </div>
    );
} 