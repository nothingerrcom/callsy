'use client'

import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useSession } from 'next-auth/react'
import Peer from 'simple-peer'
import { Instance } from 'simple-peer'

const SOCKET_SERVER = process.env.NEXT_PUBLIC_SOCKET_SERVER

interface User {
    id: string;
    username: string;
}

interface VoiceSignal {
    from: string;
    signal: any;
}

interface PeerMap {
    [key: string]: Instance;
}

export default function RoomDetailPage() {
    const { id: roomId } = useParams<{ id: string }>()
    const { data: session } = useSession()
    const [users, setUsers] = useState<User[]>([])
    const [muted, setMuted] = useState<boolean>(false)
    const socketRef = useRef<Socket | null>(null)
    const peersRef = useRef<PeerMap>({})
    const myStream = useRef<MediaStream | null>(null)

    useEffect(() => {
        if (!session?.user?.name) return

        const init = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                myStream.current = stream

                socketRef.current = io(SOCKET_SERVER)
                socketRef.current.emit('join-room', {
                    roomId,
                    username: session.user.name,
                })

                socketRef.current.on('room-users', (userList: User[]) => {
                    setUsers(prev => {
                        const newUsers = userList.filter(u => !prev.some(p => p.id === u.id))
                        return [...prev, ...newUsers]
                    })

                    userList.forEach(u => {
                        if (peersRef.current[u.id]) return
                        if (myStream.current) {
                            const peer = createPeer(u.id, myStream.current)
                            peersRef.current[u.id] = peer
                        }
                    })
                })

                socketRef.current.on('user-joined', ({ id, username }: User) => {
                    setUsers(prev => {
                        if (prev.some(u => u.id === id)) return prev
                        return [...prev, { id, username }]
                    })
                    if (peersRef.current[id]) return
                    const peer = addPeer(id, stream)
                    peersRef.current[id] = peer
                })

                socketRef.current.on('voice-signal', ({ from, signal }: VoiceSignal) => {
                    let peer = peersRef.current[from]
                    if (!peer) return

                    try {
                        const signalingState = (peer as any)._pc?.signalingState
                        if (signalingState === 'stable' && signal.type === 'answer') return
                        peer.signal(signal)
                    } catch (err) {
                        console.warn('Signal error:', err)
                    }
                })

            } catch (err) {
                console.error('Media access error:', err)
            }
        }

        init()

        return () => {
            socketRef.current?.emit('leave-room', { roomId })
            socketRef.current?.disconnect()
            Object.values(peersRef.current).forEach((p) => p.destroy())
            if (myStream.current) {
                myStream.current.getTracks().forEach((t) => t.stop())
            }
        }
    }, [session?.user?.name, roomId])

    const createPeer = (userToSignal: string, stream: MediaStream): Instance => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        })

        peer.on('signal', signal => {
            socketRef.current?.emit('voice-signal', {
                roomId,
                signal,
                to: userToSignal,
            })
        })

        peer.on('stream', (remoteStream: MediaStream) => {
            const audioElement = document.createElement('audio')
            audioElement.srcObject = remoteStream
            audioElement.play().catch(e => console.log(e))
            document.body.appendChild(audioElement)
        })

        return peer
    }

    const addPeer = (from: string, stream: MediaStream): Instance => {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on('signal', signal => {
            socketRef.current?.emit('voice-signal', {
                roomId,
                signal,
                to: from,
            })
        })

        return peer
    }

    const toggleMic = (): void => {
        if (!myStream.current) return
        const audioTrack = myStream.current.getAudioTracks()[0]
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled
            setMuted(!audioTrack.enabled)
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl mb-4">Oda Kodu: <span className="font-mono">{roomId}</span></h1>

            <button
                onClick={toggleMic}
                className={`px-4 py-2 rounded text-white ${muted ? 'bg-red-500' : 'bg-green-600'} mb-4`}
            >
                {muted ? 'Mikrofon Kapalı' : 'Mikrofon Açık'}
            </button>

            <h2 className="text-lg mb-2">Katılımcılar:</h2>
            <ul className="list-disc pl-6">
                {users.map((u) => (
                    <li key={u.id}>{u.username}</li>
                ))}
            </ul>
        </div>
    )
} 