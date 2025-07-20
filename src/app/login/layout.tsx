import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Callsy | Login"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <> {children}</>
    );
}
