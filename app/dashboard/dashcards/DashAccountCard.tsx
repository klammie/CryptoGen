"use client";

import React, { useEffect, useState } from "react";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount";
import { Wallet } from "lucide-react";
import Image from "next/image";

interface Account {
  id: string;
  mode: string;
  type: string;
  amount: number;
  image: string;
  isActive: boolean;
}

const DashboardAccountCard: React.FC = () => {
  const [accountData, setAccountData] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await getCryptoAccount();
        if (response.success && response.account) {
          setAccountData({
            ...response.account,
            mode: response.account.mode ?? "Unknown",
            isActive: response.account.isActive ?? false,
          });
        } else {
          setAccountData(null);
        }
      } catch (error) {
        console.error("Database fetch error:", error);
        setAccountData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAccountData();
  }, []);

  const isLive = accountData?.mode?.toLowerCase() === "live";

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          Account Overview
        </h2>
        {accountData && (
          <span
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${
              isLive
                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20"
                : "bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-500/30"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isLive ? "animate-pulse bg-emerald-500" : "bg-slate-400"
              }`}
            />
            {accountData.mode} Mode
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-40 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
          <div className="grid grid-cols-2 gap-3">
            <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div className="h-16 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
          </div>
        </div>
      ) : accountData ? (
        <div className="flex flex-1 flex-col gap-4">
          {/* ── Bank-style balance panel ── */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 p-5 text-white dark:border dark:border-slate-700/60">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/25 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-purple-500/15 blur-2xl" />

            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                    Total Balance
                  </p>
                  <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">
                    $
                    {accountData.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 backdrop-blur">
                  <Image
                    src={`/images/${accountData.image}.png`}
                    alt={accountData.type}
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="flex items-center gap-2 text-[12px] font-medium text-slate-300">
                  <Wallet className="h-3.5 w-3.5 text-indigo-300" />
                  {accountData.type} Account
                </span>
                <span className="text-[11px] font-medium tabular-nums text-slate-400">
                  •••• {String(accountData.id).slice(-4)}
                </span>
              </div>
            </div>
          </div>

          {/* ── Meta grid ── */}
          <div className="grid grid-cols-2 gap-3">
            {/* Type */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                Type
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {accountData.type}
              </p>
            </div>

            {/* Status (isActive) */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-800/50">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                Status
              </p>

              {accountData.isActive ? (
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {/* Animated live-trading equalizer */}
                  <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="w-[3px] origin-bottom rounded-full bg-emerald-500 animate-[eq-bar_1.1s_ease-in-out_infinite] dark:bg-emerald-400"
                        style={{ height: "100%", animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </span>
                  Trading
                </p>
              ) : (
                <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400">
                  {/* Frozen bars when paused */}
                  <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
                    {["40%", "70%", "55%", "30%"].map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-slate-300 dark:bg-slate-600"
                        style={{ height: h }}
                      />
                    ))}
                  </span>
                  Paused
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center dark:border-slate-800 dark:bg-slate-800/40">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <Wallet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            No account found
          </p>
          <p className="mt-1 max-w-[220px] text-[13px] text-slate-500 dark:text-slate-400">
            Add an account from the shop to start trading.
          </p>
          <a
            href="/dashboard/shop"
            className="mt-4 text-[13px] font-semibold text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400"
          >
            Visit the shop →
          </a>
        </div>
      )}
    </div>
  );
};

export default DashboardAccountCard;