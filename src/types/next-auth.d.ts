import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image?: string;
    }
  }

  interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    image?: string;
  }
} 