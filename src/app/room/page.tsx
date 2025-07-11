'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { generateRoomId } from '@/lib/room';
import Upane from '@/components/Common/upane';

export default function RoomPage() {
    const router = useRouter();
    const [joinId, setJoinId] = useState<string>('');
    
    const mockRooms = [
        { id: '1', name: 'Room 1', participantCount: 10, isActive: true },
        { id: '2', name: 'Room 2', participantCount: 5, isActive: false },
        { id: '3', name: 'Room 3', participantCount: 2, isActive: true },
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
                rooms={mockRooms}
                userProfile={mockProfile}
            />
            
            <div className="min-h-screen flex flex-col items-center justify-center p-6">
                <div className="w-full max-w-md">
                    <h1 className="text-4xl font-bold text-center mb-10">Main Room</h1>

                    <button 
                        onClick={createRoom} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-6 w-full transition-colors duration-200"
                    >
                        Create Room
                    </button>

                    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg">
                        <input
                            value={joinId}
                            onChange={handleJoinIdChange}
                            placeholder="Enter Room ID"
                            className="bg-white/10 border-0 p-3 w-full mb-4 text-center uppercase tracking-widest rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            maxLength={6}
                        />
                        <button 
                            onClick={joinRoom} 
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg w-full transition-colors duration-200"
                        >
                            Join Room
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
} 