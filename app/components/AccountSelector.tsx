"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getLiveAccount } from "@/app/lib/getLiveAccount";
import { AlertCircle, ArrowDownLeft, ChevronDown, Layers } from "lucide-react";

interface LiveAccountOption {
  id: string;
  type: string;
  amount: number;
}

const AccountSelector: React.FC<{
  onAccountSelect: (amount: number) => void;
}> = ({ onAccountSelect }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [accounts, setAccounts] = useState<LiveAccountOption[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getLiveAccount();
        if (response.success && Array.isArray(response.liveAccount)) {
          setAccounts(response.liveAccount);
          setTotalAmount(
            response.liveAccount.reduce((sum, acc) => sum + acc.amount, 0)
          );
        } else {
          setAccounts([]);
        }
      } catch (err) {
        console.error("Error fetching live accounts:", err);
        setError("Failed to fetch account data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const selectedAccount =
    accounts.find((acc) => acc.id === selectedAccountId) ?? null;

  const handleAccountSelection = () => {
    if (!selectedAccount) {
      toast.error("Please select an account first");
      return;
    }

    onAccountSelect(selectedAccount.amount);

    const updatedAccounts = accounts.filter(
      (acc) => acc.id !== selectedAccount.id
    );
    setAccounts(updatedAccounts);
    setTotalAmount(updatedAccounts.reduce((sum, acc) => sum + acc.amount, 0));
    setSelectedAccountId("");
  };

  const money = (value: number) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-[72px] animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-[46px] animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
        <div className="h-11 animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        {error}
      </div>
    );
  }

  /* ── Empty ── */
  if (accounts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/60 px-4 py-6 text-center dark:border-slate-700 dark:bg-slate-800/40">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          No live accounts
        </p>
        <p className="mt-1 text-[13px] text-slate-500 dark:text-slate-400">
          Purchase a live account from the shop to enable cash outs.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ── Total live funds ── */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
              Total Live Funds
            </p>
            <p className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
              ${money(totalAmount)}
            </p>
          </div>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
          {accounts.length} {accounts.length === 1 ? "account" : "accounts"}
        </span>
      </div>

      {/* ── Account select ── */}
      <div>
        <label
          htmlFor="account-dropdown"
          className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Select an account
        </label>
        <div className="relative">
          <select
            id="account-dropdown"
            value={selectedAccountId}
            onChange={(e) => setSelectedAccountId(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3.5 pr-10 text-sm font-medium text-slate-900 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="" disabled>
              Choose a live account…
            </option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.type} — ${money(account.amount)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* ── Transfer preview ── */}
      {selectedAccount && (
        <div className="flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-2.5 text-[12px] leading-relaxed text-indigo-900/70 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200/80">
          <ArrowDownLeft className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
          <span>
            <strong className="font-semibold tabular-nums">
              ${money(selectedAccount.amount)}
            </strong>{" "}
            from your {selectedAccount.type} account will be transferred to your
            main balance.
          </span>
        </div>
      )}

      {/* ── Confirm ── */}
      <Button
        onClick={handleAccountSelection}
        disabled={!selectedAccount}
        className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-900 font-semibold text-white hover:bg-black disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
        />
        <ArrowDownLeft className="mr-2 h-4 w-4" />
        Confirm Transfer
      </Button>
    </div>
  );
};

export default AccountSelector;