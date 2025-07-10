export interface Room {
  id: string;
  name: string;
  createdBy: string;
  participants: Participant[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Participant {
  id: string;
  userId: string;
  userName: string;
  roomId: string;
  isHost: boolean;
  joinedAt: Date;
}

export interface RoomConnection {
  peer: any; // SimplePeer.Instance type will be used at runtime
  stream: MediaStream;
  userId: string;
  userName: string;
} 