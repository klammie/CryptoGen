"use client";

import React, { useEffect, useState } from "react";
import { AllTrades } from "@/app/components/AllTrades";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import { getUserId } from "@/app/lib/getUserId";
import { cryptoData } from "./TradeSim";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

interface TradeLog {
  id: string;
  name: string;
  matchedCrypto?: {
    id?: number;
    image: string;
    name: string;
  };
  result: number;
  interval: number;
}

const TradeDisplay: React.FC = () => {
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTradeLogs = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          setError("User authentication failed.");
          setLoading(false);
          return;
        }

        const response = await getTradeLogs(userId);
        if (response.success && response.tradeLogs) {
          const formattedTradeLogs: TradeLog[] = response.tradeLogs.map((trade) => ({
            id: trade.id,
            result: trade.result,
            userId: trade.userId,
            name: trade.crypto,
            matchedCrypto: {
              id: Number(trade.id),
              name: trade.crypto,
              image: `/assets/cryptoimages/${trade.crypto}.png`,
            },
            interval: 0,
          }));
          setTradeLogs(formattedTradeLogs);
        } else {
          setTradeLogs([]);
          setError(response.error as string);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to retrieve trade logs.";
        console.error("Error fetching trade logs:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchTradeLogs();
  }, []);

  const getImagepath = (cryptoName: string) => {
    if (!cryptoName?.trim()) return "/crypto-images/bitcoin1.png";
    const cleanedName = cryptoName.trim().toLowerCase();
    const matchedCrypto = cryptoData.find(
      (crypto) => crypto.name.toLowerCase() === cleanedName
    );
    return matchedCrypto ? matchedCrypto.image : "/crypto-images/bitcoin1.png";
  };

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

  const displayedTrades = showAll ? tradeLogs : tradeLogs.slice(-5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Trade History
        </h2>
        <AllTrades />
      </div>

      {/* Content */}
      <div className="space-y-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="mb-3 h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400" />
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading trades...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          </div>
        ) : tradeLogs.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              No trades yet
            </p>
            <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">
              Your trades will appear here.
            </p>
          </div>
        ) : (
          displayedTrades.map((trade, index) => {
            const isProfit = trade.result >= 0;
            return (
              <div
                key={trade.id || index}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
                    <Image
                      src={getImagepath(trade.matchedCrypto?.name ?? trade.name ?? "")}
                      alt={trade.matchedCrypto?.name ?? trade.name ?? "Crypto"}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {trade.matchedCrypto?.name || trade.name || "Unknown"}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Trade executed
                    </p>
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

      {/* Show More/Less Toggle */}
      {tradeLogs.length > 5 && (
        <div className="mt-4 flex justify-center border-t border-slate-100 pt-4 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold text-slate-600 transition-colors hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show All ({tradeLogs.length}) <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeDisplay;