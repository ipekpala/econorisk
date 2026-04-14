import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Github, Linkedin } from "lucide-react";

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

        <main className="flex-1">
          {children}
        </main>

        <footer
          className="mt-10 border-t py-6 text-center text-sm flex flex-col items-center gap-3"
          style={{ color: "var(--muted)" }}
        >
          <div>
            Built by <span className="font-semibold">İpek Pala</span>
          </div>

          <div className="flex gap-4">
            <a
              href="https://github.com/ipekpala"
              target="_blank"
              className="flex items-center gap-1 hover:text-[var(--text)] transition"
            >
              <Github size={18} />
              GitHub
            </a>

            <a
              href="https://linkedin.com/in/ipek-pala-17a7052a2" // 🔴 BURAYI DEĞİŞTİR
              target="_blank"
              className="flex items-center gap-1 hover:text-[var(--text)] transition"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}