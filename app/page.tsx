import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      <section
        className="rounded-3xl border p-10 shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, var(--card) 0%, var(--card-soft) 100%)",
          borderColor: "var(--border)",
        }}
      >
        <p
          className="mb-3 text-xs uppercase tracking-[0.3em]"
          style={{ color: "var(--muted)" }}
        >
          EconoRisk
        </p>

        <h1
          className="mb-4 text-4xl font-bold tracking-tight md:text-6xl"
          style={{ color: "var(--text)" }}
        >
          Economic Crisis Early Warning Platform
        </h1>

        <p
          className="mb-8 max-w-3xl text-lg leading-8"
          style={{ color: "var(--muted)" }}
        >
          A macroeconomic risk dashboard powered by World Bank data. Analyze
          country-level indicators, compare economies, and simulate crisis
          scenarios in a modern interactive interface.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl px-5 py-3 font-semibold"
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
            }}
          >
            Open Dashboard
          </Link>

          <Link
            href="/compare"
            className="rounded-xl border px-5 py-3 font-semibold"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              backgroundColor: "var(--card)",
            }}
          >
            Compare Countries
          </Link>

          <Link
            href="/simulate"
            className="rounded-xl border px-5 py-3 font-semibold"
            style={{
              borderColor: "var(--border)",
              color: "var(--text)",
              backgroundColor: "var(--card)",
            }}
          >
            Run Simulation
          </Link>
        </div>
      </section>
    </main>
  );
}