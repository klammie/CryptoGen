"use client";

import React, { useEffect, useState } from "react";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";
import { getUserId } from "@/app/lib/getUserId";

interface TradeLog {
  crypto: string;
  result: number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ color?: string; name?: string; value?: number | string }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-lg shadow-slate-900/5">
        <p className="mb-1 text-xs font-semibold text-slate-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-[11px] font-medium" style={{ color: entry.color }}>
            {entry.name}:{" "}
            <span className="font-semibold tabular-nums">
              ${Number(entry.value ?? 0).toLocaleString()}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const InvestmentSummary = () => {
  const [data, setData] = useState<Array<{ name: string; loss: number; wins: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const response = await getTradeLogs(userId);
        if (!response.success) {
          setError("Failed to load summary.");
          setLoading(false);
          return;
        }
        const transformedData = response.tradeLogs?.reduce(
          (acc: Array<{ name: string; loss: number; wins: number }>, trade: TradeLog) => {
            const { crypto, result } = trade;
            let entry = acc.find((item) => item.name === crypto);
            if (!entry) {
              entry = { name: crypto, loss: 0, wins: 0 };
              acc.push(entry);
            }
            if (result <= 0) {
              entry.loss += Math.abs(result);
            } else {
              entry.wins += result;
            }
            return acc;
          },
          []
        );
        setData(transformedData ?? []);
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold tracking-tight text-slate-900">
          Investment Summary
        </h2>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Wins
          </span>
          <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Losses
          </span>
        </div>
      </div>

      <div className="min-h-[250px] flex-1">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="h-48 w-full animate-pulse rounded-xl bg-slate-100" />
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center py-10 text-center">
            <p className="text-sm text-rose-600">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center py-10 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-900">No data available</p>
              <p className="mt-1 text-[13px] text-slate-500">
                Start trading to see your summary.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWins" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                dx={-10}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
              <Area
                type="monotone"
                dataKey="wins"
                name="Wins"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorWins)"
              />
              <Area
                type="monotone"
                dataKey="loss"
                name="Losses"
                stroke="#f43f5e"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorLoss)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default InvestmentSummary;