interface User {
    username: string;
    password: string;
    email: string;
}

declare global {
    var __users__: User[];
}

const users = globalThis.__users__ || (globalThis.__users__ = [] as User[]);

export function findUser(username: string): User | undefined {
    return users.find(u => u.username === username);
}

export function addUser(user: User): void {
    users.push(user);
}

export function getAllUsers(): User[] {
    return [...users];
} 