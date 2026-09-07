"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getPnLStats } from "@/app/lib/getPnLStats";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string }>;
}

const PnLStats = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pnlData, setPnLData] = useState([
    { name: "Profit", value: 0 },
    { name: "Loss", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const fetchPnLData = async () => {
      try {
        const response = await getPnLStats();
        if (response.success && response.data) {
          setPnLData([
            { name: "Profit", value: response.data.profit },
            { name: "Loss", value: response.data.loss },
          ]);
        }
      } catch (error) {
        console.error("Database fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPnLData();
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  // Same purple / orange pair as Investment Summary (brighter in dark mode)
  const COLORS = isDark ? ["#818cf8", "#fb923c"] : ["#4f46e5", "#f97316"];

  const total = pnlData.reduce((sum, item) => sum + item.value, 0);
  const profitPercent = total > 0 ? ((pnlData[0].value / total) * 100).toFixed(1) : "0.0";

  const CustomTooltip = ({ active, payload }: ChartTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none">
          <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
            {payload[0].name}:{" "}
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
              ${Number(payload[0].value ?? 0).toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          P&L Statistics
        </h2>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        {loading ? (
          <div className="h-40 w-40 animate-pulse rounded-full bg-slate-100 dark:bg-slate-800" />
        ) : (
          <>
            <div className="relative aspect-square w-full max-w-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pnlData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={84}
                    paddingAngle={3}
                    cornerRadius={4}
                    strokeWidth={0}
                  >
                    {pnlData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center label */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
                  {profitPercent}%
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">
                  Win Rate
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 grid w-full grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[0] }} />
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                    Profit
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  ${pnlData[0].value.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: COLORS[1] }} />
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                    Loss
                  </p>
                </div>
                <p className="mt-1 text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-100">
                  ${pnlData[1].value.toLocaleString()}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PnLStats;