import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EconoRisk",
  description: "Economic Crisis Early Warning Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col`}
      >
        <Navbar />

        <main className="flex-1 bg-[var(--bg)] text-[var(--text)]">
          {children}
        </main>

        {/* 👇 FOOTER DOĞRU YER */}
        <footer
          className="mt-10 border-t py-6 text-center text-sm"
          style={{ color: "var(--muted)" }}
        >
          Built by İpek Pala •
          <a
            href="https://github.com/ipekpala"
            target="_blank"
            className="ml-1 underline"
          >
            GitHub
          </a>
        </footer>
      </body>
    </html>
  );
}