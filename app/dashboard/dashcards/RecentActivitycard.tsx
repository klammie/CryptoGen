"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import { getUserId } from "@/app/lib/getUserId";
import { cryptoData } from "../trades/TradeSim";

interface TradeLog {
  id: string;
  crypto: string;
  matchedCrypto?: { id?: string; image: string; name: string };
  result: number;
}

const RecentActivity: React.FC = () => {
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTradeLogs = async () => {
      const userId = await getUserId();
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await getTradeLogs(userId);
        if (response.success) {
          setTradeLogs(response.tradeLogs ?? []);
        } else {
          setError(
            typeof response.error === "string" ? response.error : "Failed to load activities."
          );
        }
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchTradeLogs();
  }, []);

  // Show most recent 5 trades first
  const recentTrades = tradeLogs.slice(-5).reverse();

  const formatTradeResult = (result: number): string => {
    const prefix = result >= 0 ? "+" : "-";
    const formatted =
      Math.abs(result) >= 1000
        ? Math.round(Math.abs(result)).toLocaleString()
        : Math.abs(result) >= 100
        ? Math.abs(result).toFixed(1)
        : Math.abs(result).toFixed(2);
    return `${prefix}$${formatted}`;
  };

  const getImagepath = (cryptoName: string) => {
    if (!cryptoName) return "/crypto-images/bitcoin1.png";
    const matchedCrypto = cryptoData.find(
      (crypto) => crypto.name.toLowerCase() === cryptoName.toLowerCase()
    );
    return matchedCrypto ? matchedCrypto.image : "/crypto-images/bitcoin1.png";
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Recent Activity
        </h2>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
          Last 5
        </span>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {loading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex animate-pulse items-center gap-3 p-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 rounded bg-slate-100 dark:bg-slate-800" />
                  <div className="h-3 w-16 rounded bg-slate-100 dark:bg-slate-800" />
                </div>
                <div className="h-6 w-16 rounded-lg bg-slate-100 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-1 items-center justify-center py-10 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          </div>
        ) : recentTrades.length === 0 ? (
          <div className="flex flex-1 items-center justify-center py-10 text-center">
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No recent activities
              </p>
              <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">
                Your trades will appear here.
              </p>
            </div>
          </div>
        ) : (
          recentTrades.map((trade, index) => {
            const isProfit = trade.result >= 0;
            return (
              <div
                key={trade.id || index}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
                    <Image
                      src={getImagepath(trade.crypto ?? "")}
                      alt={trade.crypto ?? "Crypto"}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {trade.crypto || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Trade executed</p>
                  </div>
                </div>

                <span
                  className={`rounded-lg px-2.5 py-1 text-[13px] font-semibold tabular-nums ring-1 ${
                    isProfit
                      ? "bg-indigo-50 text-indigo-700 ring-indigo-600/15 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-400/20"
                      : "bg-orange-50 text-orange-700 ring-orange-600/15 dark:bg-orange-500/10 dark:text-orange-300 dark:ring-orange-400/20"
                  }`}
                >
                  {formatTradeResult(trade.result)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;