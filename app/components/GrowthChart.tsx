"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  data: { year: string; growth: number }[];
};

export default function GrowthChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div className="mt-10 text-center text-sm text-gray-400">
        No growth data available
      </div>
    );
  }

  return (
    <section className="mt-10 rounded-2xl border p-6">
      <p className="text-sm uppercase tracking-widest text-gray-400">
        Analytics
      </p>

      <h2 className="mb-6 mt-2 text-2xl font-semibold text-white">
        GDP Growth Trend
      </h2>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="year" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="growth"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}