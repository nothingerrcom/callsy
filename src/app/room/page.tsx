'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { generateRoomId } from '@/lib/room';
import Upane from '@/components/Common/upane';

export default function RoomPage() {
    const router = useRouter();
    const [joinId, setJoinId] = useState<string>('');
    
    const mockParticipants = [
        { id: '1', name: 'HypeCaves', isSpeaking: true, isMuted: false },
        { id: '2', name: 'xReactive', isSpeaking: false, isMuted: true },
        { id: '3', name: 'Selooona', isSpeaking: false, isMuted: false },
    ];

    const mockProfile = {
        name: 'HypeCaves',
        imageUrl: '/tests/profile.jpg'
    };

    const createRoom = (): void => {
        const id = generateRoomId();
        router.push(`/room/${id}`);
    };

    const joinRoom = (): void => {
        if (joinId.length !== 6) {
            alert('Enter a valid room ID (6 characters)');
            return;
        }
        router.push(`/room/${joinId}`);
    };

    const handleJoinIdChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setJoinId(e.target.value.toUpperCase());
    };

    return (
        <>
            <Upane 
                isActive={true} 
                participants={mockParticipants}
                userProfile={mockProfile}
            />
            
            <div className="p-6 max-w-md mx-auto">
                <h1 className="text-2xl mb-6">Voice & Chat Room</h1>

                <button 
                    onClick={createRoom} 
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-4 w-full"
                >
                    Create Room
                </button>

                <input
                    value={joinId}
                    onChange={handleJoinIdChange}
                    placeholder="Enter Room ID"
                    className="border p-2 w-full mb-2 text-center uppercase tracking-widest"
                    maxLength={6}
                />
                <button 
                    onClick={joinRoom} 
                    className="bg-green-600 text-white px-4 py-2 rounded w-full"
                >
                    Join Room
                </button>
            </div>
        </>
    );
} 