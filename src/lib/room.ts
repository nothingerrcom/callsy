import { Room, Participant } from '@/types/room';

const rooms = new Map<string, Room>();

export function generateRoomId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export function createRoom(name: string, createdBy: string): Room {
  const id = generateRoomId();
  const room: Room = {
    id,
    name,
    createdBy,
    participants: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  rooms.set(id, room);
  return room;
}

export function getRoom(id: string): Room | undefined {
  return rooms.get(id);
}

export function addParticipant(roomId: string, participant: Participant): Room | undefined {
  const room = rooms.get(roomId);
  if (!room) return undefined;

  room.participants.push(participant);
  room.updatedAt = new Date();
  rooms.set(roomId, room);
  return room;
}

export function removeParticipant(roomId: string, userId: string): Room | undefined {
  const room = rooms.get(roomId);
  if (!room) return undefined;

  room.participants = room.participants.filter(p => p.userId !== userId);
  room.updatedAt = new Date();
  rooms.set(roomId, room);
  return room;
}

export function deleteRoom(id: string): boolean {
  return rooms.delete(id);
}

export function getAllRooms(): Room[] {
  return Array.from(rooms.values());
}

export function getRoomsByUser(userId: string): Room[] {
  return Array.from(rooms.values()).filter(room => 
    room.createdBy === userId || room.participants.some(p => p.userId === userId)
  );
} 