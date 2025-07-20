import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inster = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Callsy | Make Your Voice Heard to Everyone.",
  description: "Make yourself heard and chat seamlessly with your family, friends, or anyone else with Callsy. Visit callsy.app to learn more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inster.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}