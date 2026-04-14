"use client";

import { useState } from "react";
import { countries, sortedCountries } from "../data/macroData";
import { calculateRisk, getRiskLevel } from "../lib/riskScore";

export default function ComparePage() {
  const [countryA, setCountryA] = useState("Turkey");
  const [countryB, setCountryB] = useState("USA");

  const dataA = countries.find((c) => c.name === countryA);
  const dataB = countries.find((c) => c.name === countryB);

  const scoreA = dataA ? calculateRisk(dataA) : 0;
  const scoreB = dataB ? calculateRisk(dataB) : 0;

  const levelA = getRiskLevel(scoreA);
  const levelB = getRiskLevel(scoreB);

  return (
    <main className="min-h-screen px-6 py-10 md:px-10">
      {/* HEADER */}
      <section
        className="mb-10 rounded-3xl border p-8"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h1 className="text-4xl font-bold mb-3">Country Comparison</h1>
        <p style={{ color: "var(--muted)" }}>
          Compare macroeconomic indicators and crisis risk between countries.
        </p>
      </section>

      {/* SELECTORS */}
      <section className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectBox
          label="Country A"
          value={countryA}
          setValue={setCountryA}
        />
        <SelectBox
          label="Country B"
          value={countryB}
          setValue={setCountryB}
        />
      </section>

      {/* CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CountryCard country={dataA} score={scoreA} level={levelA} />
        <CountryCard country={dataB} score={scoreB} level={levelB} />
      </section>

      {/* DIFFERENCE */}
      {dataA && dataB && (
        <section
          className="mt-10 rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Key Differences
          </h2>

          <div className="space-y-3 text-sm">
            <Diff
              label="Inflation"
              a={dataA.inflation}
              b={dataB.inflation}
            />
            <Diff
              label="Interest Rate"
              a={dataA.interest}
              b={dataB.interest}
            />
            <Diff
              label="Unemployment"
              a={dataA.unemployment}
              b={dataB.unemployment}
            />
            <Diff
              label="Growth"
              a={dataA.growth}
              b={dataB.growth}
            />
            <Diff label="Risk Score" a={scoreA} b={scoreB} />
          </div>
        </section>
      )}
    </main>
  );
}

function SelectBox({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div
      className="rounded-2xl border p-4"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
        {label}
      </p>

      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border px-3 py-2"
        style={{
          backgroundColor: "var(--card-soft)",
          borderColor: "var(--border)",
          color: "var(--text)",
        }}
      >
        {countries.map((c) => (
          <option key={c.name}>{c.name}</option>
        ))}
      </select>
    </div>
  );
}

function CountryCard({
  country,
  score,
  level,
}: any) {
  if (!country) return null;

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
    >
      <h2 className="text-2xl font-semibold mb-4">
        {country.name}
      </h2>

      <p style={{ color: "var(--muted)" }}>Risk Score</p>
      <p className="text-3xl font-bold mb-4">{score}</p>

      <p className="mb-4">{level} Risk</p>

      <div className="space-y-2 text-sm">
        <p>Inflation: {country.inflation}%</p>
        <p>Interest: {country.interest}%</p>
        <p>Unemployment: {country.unemployment}%</p>
        <p>Growth: {country.growth}%</p>
      </div>
    </div>
  );
}

function Diff({
  label,
  a,
  b,
}: {
  label: string;
  a: number;
  b: number;
}) {
  const diff = a - b;

  return (
    <div
      className="rounded-xl border p-3"
      style={{
        backgroundColor: "var(--card-soft)",
        borderColor: "var(--border)",
      }}
    >
      <span style={{ color: "var(--muted)" }}>{label}: </span>
      <span>
        {Math.abs(diff)} {diff > 0 ? "higher in A" : "higher in B"}
      </span>
    </div>
  );
}