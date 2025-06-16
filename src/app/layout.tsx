import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai - Flashcards",
  description: "A smart flashcard app that creates quiz cards from your Topics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <Toaster />
        {children}
        <footer className="border-t border-blue-100 py-4 text-center flex justify-around -safe text-xs text-blue-600">
          <div className="flex justify-center gap-4 flex-wrap">
            <p> developed by <a href="https://x.com/jatinnvw" className="hover:underline cursor-pointer">Jatin</a></p>

          </div>
          <p className="">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
