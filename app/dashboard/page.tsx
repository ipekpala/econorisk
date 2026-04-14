"use client";

import { useEffect, useState } from "react";
import { countries, sortedCountries } from "../data/macroData";
import {
  calculateRisk,
  getRiskLevel,
  getRiskBreakdown,
} from "../lib/riskScore";
import GrowthChart from "../components/GrowthChart";

export default function Dashboard() {
  const [selectedCountry, setSelectedCountry] = useState("Turkey");
  const [realData, setRealData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const selected = countries.find((c) => c.name === selectedCountry);

      if (!selected) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/macro?country=${selected.code}`);
        const data = await res.json();
        setRealData(data);
      } catch (error) {
        console.error("Failed to fetch real macro data:", error);
        setRealData(null);
      }

      setLoading(false);
    }

    fetchData();
  }, [selectedCountry]);

  const activeCountry = countries.find(
    (country) => country.name === selectedCountry
  );

  const mergedData =
    activeCountry && realData
      ? {
          ...activeCountry,
          inflation: realData.inflation ?? activeCountry.inflation,
          interest: realData.interest ?? activeCountry.interest,
          unemployment: realData.unemployment ?? activeCountry.unemployment,
          growth: realData.growth ?? activeCountry.growth,
        }
      : activeCountry;

  const breakdown = mergedData ? getRiskBreakdown(mergedData) : null;
  const score = mergedData ? calculateRisk(mergedData) : 0;
  const level = getRiskLevel(score);

  const riskBadgeClass =
    level === "Low"
      ? "bg-green-500/15 text-green-500 border-green-500/30"
      : level === "Medium"
      ? "bg-yellow-500/15 text-yellow-500 border-yellow-500/30"
      : level === "High"
      ? "bg-orange-500/15 text-orange-500 border-orange-500/30"
      : "bg-red-500/15 text-red-500 border-red-500/30";

  if (loading && !mergedData) {
    return (
      <div className="min-h-screen px-6 py-10 md:px-10">
        <div
          className="rounded-2xl border p-8 text-center"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
        >
          Loading real data...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10 md:px-10">
      <section
        className="mb-10 rounded-3xl border p-8 shadow-xl"
        style={{
          background:
            "linear-gradient(135deg, var(--card) 0%, var(--card-soft) 100%)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              className="mb-3 text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--muted)" }}
            >
              EconoRisk
            </p>

            <h1
              className="mb-3 text-4xl font-bold tracking-tight md:text-5xl"
              style={{ color: "var(--text)" }}
            >
              Economic Crisis Early Warning Dashboard
            </h1>

            <p
              className="max-w-2xl text-lg leading-8"
              style={{ color: "var(--muted)" }}
            >
              Monitor macroeconomic pressure, compare country risk, and explore
              how inflation, interest rates, unemployment, and growth shape
              crisis vulnerability.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <label
              className="mb-2 block text-sm"
              style={{ color: "var(--muted)" }}
            >
              Selected Country
            </label>

            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 outline-none lg:w-56"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                color: "var(--text)",
              }}
            >
              {countries.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div
          className="rounded-2xl border p-6 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
            Country
          </p>
          <p className="text-3xl font-bold" style={{ color: "var(--text)" }}>
            {selectedCountry}
          </p>
        </div>

        <div
          className="rounded-2xl border p-6 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
            Risk Score
          </p>
          <p className="text-3xl font-bold" style={{ color: "var(--text)" }}>
            {score}
          </p>
        </div>

        <div
          className="rounded-2xl border p-6 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
            Risk Level
          </p>
          <div
            className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${riskBadgeClass}`}
          >
            {level} Risk
          </div>
        </div>

        <div
          className="rounded-2xl border p-6 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
            Main Driver
          </p>
          <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            {breakdown ? breakdown.mainDriver.label : "-"}
          </p>
        </div>
      </section>

      {mergedData && (
        <section className="mb-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div
            className="rounded-2xl border p-6 xl:col-span-2 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p
                  className="text-sm uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted)" }}
                >
                  Macro Snapshot
                </p>
                <h2
                  className="mt-2 text-2xl font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {mergedData.name}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Status
                </p>
                <p
                  className="text-lg font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {level} Risk
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <MetricBox
                label="Inflation"
                value={
                  mergedData.inflation !== null &&
                  mergedData.inflation !== undefined
                    ? `${Number(mergedData.inflation).toFixed(1)}%`
                    : "N/A"
                }
              />
              <MetricBox
                label="Interest Rate"
                value={
                  mergedData.interest !== null &&
                  mergedData.interest !== undefined
                    ? `${Number(mergedData.interest).toFixed(1)}%`
                    : "N/A"
                }
              />
              <MetricBox
                label="Unemployment"
                value={
                  mergedData.unemployment !== null &&
                  mergedData.unemployment !== undefined
                    ? `${Number(mergedData.unemployment).toFixed(1)}%`
                    : "N/A"
                }
              />
              <MetricBox
                label="Growth"
                value={
                  mergedData.growth !== null && mergedData.growth !== undefined
                    ? `${Number(mergedData.growth).toFixed(1)}%`
                    : "N/A"
                }
              />
            </div>
          </div>

          <div
            className="rounded-2xl border p-6 shadow-sm"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
            }}
          >
            <p
              className="text-sm uppercase tracking-[0.2em]"
              style={{ color: "var(--muted)" }}
            >
              Quick Insight
            </p>

            <h2
              className="mb-4 mt-2 text-2xl font-semibold"
              style={{ color: "var(--text)" }}
            >
              Country Summary
            </h2>

            <div className="space-y-4 text-sm">
              <InfoBox title="Selected country" value={selectedCountry} />
              <InfoBox
                title="Primary concern"
                value={breakdown?.mainDriver.label ?? "-"}
              />
              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--card-soft)",
                  borderColor: "var(--border)",
                }}
              >
                <p style={{ color: "var(--muted)" }}>Interpretation</p>
                <p
                  className="mt-2 leading-6"
                  style={{ color: "var(--text)" }}
                >
                  {level === "Low" &&
                    "Current macroeconomic conditions look relatively stable."}
                  {level === "Medium" &&
                    "Some pressure points exist and should be monitored closely."}
                  {level === "High" &&
                    "Macroeconomic vulnerability is elevated and downside risk is meaningful."}
                  {level === "Critical" &&
                    "The economy is under substantial stress and appears highly fragile."}
                </p>
              </div>

              <div
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--card-soft)",
                  borderColor: "var(--border)",
                }}
              >
                <p style={{ color: "var(--muted)" }}>Data source</p>
                <p
                  className="mt-2 font-medium"
                  style={{ color: "var(--text)" }}
                >
                  World Bank API
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {breakdown && (
        <section
          className="mb-10 rounded-2xl border p-6 shadow-sm"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="mb-2 text-sm uppercase tracking-[0.2em]"
            style={{ color: "var(--muted)" }}
          >
            Risk Analysis
          </p>

          <h2
            className="mb-3 text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            Why is {selectedCountry} risky?
          </h2>

          <p className="mb-6" style={{ color: "var(--muted)" }}>
            Main Driver:{" "}
            <span className="font-semibold" style={{ color: "var(--text)" }}>
              {breakdown.mainDriver.label}
            </span>
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            {breakdown.explanations.map((text, index) => (
              <div
                key={index}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--card-soft)",
                  borderColor: "var(--border)",
                  color: "var(--text)",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </section>
      )}

      <GrowthChart data={realData?.growthSeries || []} />
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        backgroundColor: "var(--card-soft)",
        borderColor: "var(--border)",
      }}
    >
      <p className="text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold" style={{ color: "var(--text)" }}>
        {value}
      </p>
    </div>
  );
}

function InfoBox({ title, value }: { title: string; value: string }) {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        backgroundColor: "var(--card-soft)",
        borderColor: "var(--border)",
      }}
    >
      <p style={{ color: "var(--muted)" }}>{title}</p>
      <p
        className="mt-2 text-lg font-semibold"
        style={{ color: "var(--text)" }}
      >
        {value}
      </p>
    </div>
  );
}