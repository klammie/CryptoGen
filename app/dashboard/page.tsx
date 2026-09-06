"use client";

import { PageEnter } from "@/app/components/ui/PageEnter";
import DashAccountCard from "@/app/dashboard/dashcards/DashAccountCard";
import InvestmentSummary from "@/app/dashboard/dashcards/InvestmentSummary";
import PnLStats from "@/app/dashboard/dashcards/PnLStats";
import RecentActivity from "@/app/dashboard/dashcards/RecentActivitycard";

export default function DashboardPage() {
  return (
    <PageEnter>
      <div className="min-h-screen bg-slate-50/70 antialiased">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10 lg:px-8">
          {/* ── Page header ── */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600">
                Dashboard
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                Portfolio Overview
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                Monitor your accounts, performance and recent activity in real time.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 shadow-sm md:self-auto">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Live data
            </div>
          </div>

          {/* ── Cards grid ── */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <DashAccountCard />

            <div className="h-full lg:col-span-2">
              <InvestmentSummary />
            </div>

            <PnLStats />

            <div className="h-full lg:col-span-2">
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </PageEnter>
  );
}