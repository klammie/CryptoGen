"use client";

import React, { useEffect, useState } from "react";
import ToggleTrade from "@/app/components/LiveToggleTrade";
import TradeDisplay from "@/app/dashboard/trades/TradeDisplay";
import { Toaster } from "sonner";
import InvestorConnector from "@/app/components/InvestorConnector";
import Image from "next/image";
import { Account } from "../dashboard/trades/TradeSim";
import { getLiveAccount } from "../lib/getLiveAccount";
import { Loader2, Wallet, Zap } from "lucide-react";

const LiveAccount: React.FC = () => {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getLiveAccount();
        if (response.success && Array.isArray(response.liveAccount)) {
          setAccountData(
            response.liveAccount.map((account) => ({
              ...account,
              cryptoId: account.cryptoId ?? undefined,
            }))
          );
        } else {
          setAccountData([]);
        }
      } catch (err) {
        console.error("Error fetching crypto accounts:", err);
        setError("Failed to fetch account data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-16 dark:border-slate-800 dark:bg-slate-900">
        <Loader2 className="mb-3 h-6 w-6 animate-spin text-indigo-600 dark:text-indigo-400" />
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Loading your accounts...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-sm font-medium text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {accountData.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 p-12 text-center dark:border-slate-800 dark:bg-slate-900/60">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            No Live Accounts
          </h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Add a live account from the shop to start trading.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accountData.map((account) => (
            <div
              key={account.id}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
            >
              {/* ── Bank-style balance panel (matches AccountOverview) ── */}
              <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white dark:border dark:border-slate-700/60">
                <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/25 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-purple-500/15 blur-2xl" />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Live Mode
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur">
                      <Image
                        src={`/images/${account.image}.png`}
                        alt={account.type}
                        width={22}
                        height={22}
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                      Total Balance
                    </p>
                    <p className="mt-1.5 text-3xl font-bold tracking-tight tabular-nums">
                      $
                      {account.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="flex items-center gap-2 text-[12px] font-medium text-slate-300">
                      <Wallet className="h-3.5 w-3.5 text-indigo-300" />
                      {account.type} Account
                    </span>
                    <span className="text-[11px] font-medium tabular-nums text-slate-400">
                      •••• {String(account.id).slice(-4)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Footer actions ── */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex-1">
                  <ToggleTrade account={account} />
                </div>
                <InvestorConnector />
              </div>
            </div>
          ))}
        </div>
      )}

      <TradeDisplay />
      <Toaster position="bottom-left" richColors />
    </div>
  );
};

export default LiveAccount;