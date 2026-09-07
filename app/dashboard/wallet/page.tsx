import { Cashout } from "@/app/components/Cashout";
import { Deposit } from "@/app/components/Deposit";
import Withdrawl from "@/app/components/Withdrawl";
import { getData } from "@/app/lib/getData";
import { requireUser } from "@/app/lib/hooks";
import { Key, TrendingUp, Shield, ShieldCheck } from "lucide-react";
import { Toaster } from "sonner";

export default async function WalletRoute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);

  const balance = data?.accBal ?? 0;
  const freeMargin = (balance * 1.2).toFixed(2);
  const keys = data?.keyz ?? 0;

  const stats = [
    {
      Icon: TrendingUp,
      label: "Free Margin",
      value: `$${Number(freeMargin).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      hint: "Available buying power",
      chip: "border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      Icon: Key,
      label: "Access Keys",
      value: String(keys),
      hint: "Active trading licences",
      chip: "border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400",
    },
    {
      Icon: Shield,
      label: "Leverage",
      value: "1:1000",
      hint: "Maximum exposure per trade",
      chip: "border-purple-100 bg-purple-50 text-purple-600 dark:border-purple-500/20 dark:bg-purple-500/10 dark:text-purple-400",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/70 p-4 md:p-6 lg:p-8 dark:bg-slate-950">
      <div className="mx-auto max-w-5xl">
        {/* ── Page header ── */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
              Wallet
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
              Funds & Accounts
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Manage your balance, trading accounts and transfers.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-600 shadow-sm md:self-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            Funds secured · 256-bit encryption
          </div>
        </div>

        {/* ── Balance panel ── */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-900/20 md:p-8 dark:border dark:border-slate-800">
          {/* Brand glows */}
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
                Total Balance
              </p>
              <h2 className="mt-2 text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
                $
                {balance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </h2>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Main trading wallet
                </span>
                <span className="flex items-center gap-2">
                  <Key className="h-3.5 w-3.5 text-indigo-300" />
                  {keys} access {keys === 1 ? "key" : "keys"}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Deposit />
              <Withdrawl />
              <Cashout />
            </div>
          </div>
        </div>

        {/* ── Stats grid ── */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${s.chip}`}
                >
                  <s.Icon className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
              <p className="text-2xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white">
                {s.value}
              </p>
              <p className="mt-1 text-[12px] text-slate-400 dark:text-slate-500">{s.hint}</p>
            </div>
          ))}
        </div>
      </div>

      <Toaster richColors position="bottom-left" />
    </div>
  );
}