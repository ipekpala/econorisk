import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">EconoRisk</h1>

      <p className="text-lg text-gray-300 mb-6 text-center max-w-xl">
        Economic Crisis Early Warning Dashboard
      </p>

      <Link href="/dashboard">
        <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-200">
          Open Dashboard
        </button>
      </Link>
    </main>
  );
}