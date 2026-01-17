import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CZN",
  description: "Chaos Zero Nightmare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#6658539d]`}
      >
        <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800 px-4 py-3">
          <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
            <Image src="/logo.svg" alt="Chaos Zero Nightmare" width={200} height={60} className="h-10 w-auto" />
          </Link>
        </header>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
