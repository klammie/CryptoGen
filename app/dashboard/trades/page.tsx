"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import DemoAccount from "@/app/components/DemoAccounts";
import LiveAccount from "@/app/components/LiveAccount";

export default function TradesPage() {
  const [activeTab, setActiveTab] = useState<"live" | "demo">("live");

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        {/* ── Page header + segmented control ── */}
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
              Trading
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
              Trading Accounts
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Manage your live and demo trading environments.
            </p>
          </div>

          <div className="inline-flex self-start rounded-xl border border-slate-200 bg-white p-1 shadow-sm md:self-auto dark:border-slate-800 dark:bg-slate-900">
            {(["live", "demo"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-indigo-700 dark:text-indigo-300"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                {activeTab === tab && (
                  <motion.span
                    layoutId="trades-tab-pill"
                    className="absolute inset-0 rounded-lg border border-indigo-100 bg-indigo-50/80 dark:border-indigo-500/30 dark:bg-indigo-500/10"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative capitalize">{tab} Accounts</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Content ─ */}
        <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {activeTab === "live" ? <LiveAccount /> : <DemoAccount />}
        </div>
      </div>
    </div>
  );
}