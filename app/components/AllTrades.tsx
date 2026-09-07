"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import { getUserId } from "../lib/getUserId";
import { cryptoData } from "../dashboard/trades/TradeSim";
import { AlertCircle, History, Loader2 } from "lucide-react";

interface TradeLog {
  id: string;
  crypto: string;
  matchedCrypto?: {
    id?: string;
    image: string;
    name: string;
  };
  result: number;
}

export function AllTrades() {
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTradeLogs = async () => {
      const id = await getUserId();
      if (!id) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await getTradeLogs(id);
        if (response.success) {
          setTradeLogs(response.tradeLogs ?? []);
        } else {
          setError(
            typeof response.error === "string"
              ? response.error
              : JSON.stringify(response.error)
          );
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTradeLogs();
  }, []);

  const getImagepath = (cryptoName: string) => {
    if (!cryptoName?.trim()) {
      return "/crypto-images/bitcoin1.png";
    }
    const cleanedName = cryptoName.trim().toLowerCase();
    const matchedCrypto = cryptoData.find(
      (crypto) => crypto.name.toLowerCase() === cleanedName
    );
    return matchedCrypto ? matchedCrypto.image : "/crypto-images/bitcoin1.png";
  };

  const formatTradeResult = (result: number): string => {
    const prefix = result >= 0 ? "+" : "-";
    const abs = Math.abs(result);
    const formatted =
      abs >= 1000
        ? Math.round(abs).toLocaleString()
        : abs >= 100
        ? abs.toFixed(1)
        : abs.toFixed(2);
    return `${prefix}$${formatted}`;
  };

  const netPnL = tradeLogs.reduce((sum, t) => sum + t.result, 0);
  const netPositive = netPnL >= 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[12px] font-semibold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300"
        >
          View All
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px] overflow-hidden rounded-2xl border-slate-200 p-0 dark:border-slate-800">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        {/* Header */}
        <DialogHeader className="px-6 pb-2 pt-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            All Trades
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Complete history of every trade executed by your accounts.
          </DialogDescription>
        </DialogHeader>

        {/* Trade list */}
        <div className="max-h-[420px] overflow-y-auto px-6 pb-6 pt-2">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="mb-3 h-5 w-5 animate-spin text-indigo-600 dark:text-indigo-400" />
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Loading trade history...
              </p>
            </div>
          ) : error ? (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          ) : tradeLogs.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-10 text-center dark:border-slate-700 dark:bg-slate-800/40">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                No trades yet
              </p>
              <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">
                Your executed trades will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {tradeLogs.map((trade, index) => {
                const isProfit = trade.result >= 0;
                return (
                  <div
                    key={trade.id || index}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60">
                        <Image
                          src={getImagepath(
                            trade.matchedCrypto?.name ?? trade.crypto ?? ""
                          )}
                          alt={
                            trade.matchedCrypto?.name ?? trade.crypto ?? "Unknown Crypto"
                          }
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {trade.matchedCrypto?.name ?? trade.crypto ?? "Unknown"}
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
              })}
            </div>
          )}
        </div>

        {/* Summary footer */}
        {!loading && !error && tradeLogs.length > 0 && (
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-6 py-3 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
              {tradeLogs.length} {tradeLogs.length === 1 ? "trade" : "trades"} · Net P&L
            </span>
            <span
              className={`text-[13px] font-bold tabular-nums ${
                netPositive
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-orange-600 dark:text-orange-400"
              }`}
            >
              {formatTradeResult(netPnL)}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}