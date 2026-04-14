"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("light", savedTheme === "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav
      className="w-full border-b px-8 py-4 backdrop-blur"
      style={{
        backgroundColor: "var(--nav)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          EconoRisk
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/compare">Compare</Link>
          <Link href="/simulate">Simulate</Link>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border px-3 py-1"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              backgroundColor: "var(--card)",
            }}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}