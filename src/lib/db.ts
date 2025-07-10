import bcrypt from "bcrypt";

export interface User {
    username: string;
    password: string;
    email: string;
}

export interface Room {
    id: string;
    name: string;
    createdBy: string;
    participants: string[];
}

// In-memory database
let users: User[] = [];
let rooms: Room[] = [];

// Add a test user
const addTestUser = async () => {
    const hashedPassword = await bcrypt.hash("test123", 10);
    users = [{
        username: "test",
        password: hashedPassword,
        email: "test@example.com"
    }];
    console.log("Test kullanıcısı eklendi:", users[0]);
};

// Initialize test user
addTestUser();

export async function findUser(username: string): Promise<User | null> {
    console.log("Aranan kullanıcı:", username);
    console.log("Mevcut kullanıcılar:", users);
    return users.find(u => u.username === username) || null;
}

export async function createUser(username: string, password: string, email: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: User = {
        username,
        password: hashedPassword,
        email
    };
    users.push(user);
    return user;
}

export async function createRoom(name: string, createdBy: string): Promise<Room> {
    const room: Room = {
        id: Math.random().toString(36).substring(7),
        name,
        createdBy,
        participants: [createdBy]
    };
    rooms.push(room);
    return room;
}

export async function findRoom(id: string): Promise<Room | null> {
    return rooms.find(r => r.id === id) || null;
}

export async function findRoomsByUser(username: string): Promise<Room[]> {
    return rooms.filter(r => r.participants.includes(username));
}

export async function joinRoom(roomId: string, username: string): Promise<Room | null> {
    const room = await findRoom(roomId);
    if (!room) return null;
    
    if (!room.participants.includes(username)) {
        room.participants.push(username);
    }
    return room;
}

export async function leaveRoom(roomId: string, username: string): Promise<Room | null> {
    const room = await findRoom(roomId);
    if (!room) return null;
    
    room.participants = room.participants.filter(p => p !== username);
    return room;
} 