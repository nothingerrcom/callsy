"use client";

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex gap-4">
        <Link 
          href="/login" 
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link 
          href="/register" 
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
