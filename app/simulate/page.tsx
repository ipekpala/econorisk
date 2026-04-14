"use client";

import { useState } from "react";
import {
  calculateRisk,
  getRiskLevel,
  getRiskBreakdown,
} from "../lib/riskScore";

export default function SimulatePage() {
  const [inflation, setInflation] = useState(20);
  const [interest, setInterest] = useState(15);
  const [unemployment, setUnemployment] = useState(7);
  const [growth, setGrowth] = useState(3);

  const simulatedCountry = {
    name: "Custom Scenario",
    inflation,
    interest,
    unemployment,
    growth,
  };

  const score = calculateRisk(simulatedCountry);
  const level = getRiskLevel(score);
  const breakdown = getRiskBreakdown(simulatedCountry);

  const riskBadgeClass =
    level === "Low"
      ? "bg-green-500/15 text-green-500 border-green-500/30"
      : level === "Medium"
      ? "bg-yellow-500/15 text-yellow-500 border-yellow-500/30"
      : level === "High"
      ? "bg-orange-500/15 text-orange-500 border-orange-500/30"
      : "bg-red-500/15 text-red-500 border-red-500/30";

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
          Scenario Simulator
        </h1>

        <p
          className="max-w-2xl text-lg leading-8"
          style={{ color: "var(--muted)" }}
        >
          Adjust macroeconomic inputs and observe how the crisis risk score changes.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <SliderBlock
            label="Inflation"
            value={inflation}
            min={0}
            max={100}
            onChange={setInflation}
          />

          <SliderBlock
            label="Interest Rate"
            value={interest}
            min={0}
            max={60}
            onChange={setInterest}
          />

          <SliderBlock
            label="Unemployment"
            value={unemployment}
            min={0}
            max={30}
            onChange={setUnemployment}
          />

          <SliderBlock
            label="Growth"
            value={growth}
            min={-10}
            max={15}
            onChange={setGrowth}
          />
        </div>

        <div
          className="rounded-2xl border p-6"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="mb-2 text-sm uppercase tracking-[0.2em]"
            style={{ color: "var(--muted)" }}
          >
            Simulation Output
          </p>

          <h2
            className="mb-6 text-2xl font-semibold"
            style={{ color: "var(--text)" }}
          >
            Risk Assessment
          </h2>

          <div className="mb-6">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Risk Score
            </p>
            <p className="text-5xl font-bold" style={{ color: "var(--text)" }}>
              {score}
            </p>
          </div>

          <div className="mb-6">
            <p className="mb-2 text-sm" style={{ color: "var(--muted)" }}>
              Risk Level
            </p>
            <div
              className={`inline-flex rounded-full border px-4 py-2 text-sm font-semibold ${riskBadgeClass}`}
            >
              {level} Risk
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              Main Driver
            </p>
            <p className="mt-2 text-2xl font-bold" style={{ color: "var(--text)" }}>
              {breakdown.mainDriver.label}
            </p>
          </div>

          <div className="space-y-3">
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
        </div>
      </section>
    </div>
  );
}

function SliderBlock({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mb-8 last:mb-0">
      <label
        className="mb-3 block text-sm font-medium"
        style={{ color: "var(--text)" }}
      >
        {label}: {value}%
      </label>

      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: "var(--accent)" }}
      />
    </div>
  );
}