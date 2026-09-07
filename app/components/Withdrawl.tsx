"use client";

import React, { useState } from "react";
import { WithdrawlAction } from "../lib/Withdrawlaction";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { AlertCircle, ArrowUpRight, Loader2 } from "lucide-react";

const PERCENTS = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "75%", value: 0.75 },
  { label: "Max", value: 1 },
];

const Withdrawl: React.FC = () => {
  const [accBal, setAccBal] = useState<number>(1000);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const amountNumber = Number(withdrawAmount);

  const applyPercent = (pct: number) => {
    const value = Math.floor(accBal * pct * 100) / 100;
    setWithdrawAmount(String(value));
  };

  const handleWithdraw = async () => {
    if (isNaN(amountNumber) || amountNumber <= 0) {
      toast.error("Invalid withdrawal amount");
      return;
    }
    if (amountNumber > accBal) {
      toast.error("Insufficient balance");
      return;
    }
    setLoading(true);
    const newBalance = accBal - amountNumber;
    setAccBal(newBalance);
    const formData = new FormData();
    formData.set("valueToWithdraw", withdrawAmount);
    try {
      await WithdrawlAction(formData);
      toast.success("Withdrawal is being processed");
    } catch (error) {
      console.error("Failed to update account balance:", error);
      toast.error("Failed to process withdrawal");
      setAccBal(accBal);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group relative h-10 overflow-hidden rounded-xl border-white/15 bg-white/10 px-4 font-semibold text-white backdrop-blur hover:bg-white/15 hover:text-white dark:hover:bg-white/15"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
          />
          <ArrowUpRight className="mr-2 h-4 w-4 text-indigo-300" />
          Withdraw
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px] overflow-hidden rounded-2xl border-slate-200 p-0 dark:border-slate-800">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        <DialogHeader className="px-6 pb-2 pt-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <ArrowUpRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Withdraw Funds
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Transfer funds from your trading account to your bank or wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 pb-6 pt-2">
          {/* Available balance */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
            <span className="text-[12px] font-medium text-slate-500 dark:text-slate-400">
              Available balance
            </span>
            <span className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
              $
              {accBal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="withdraw-amount"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                $
              </span>
              <input
                id="withdraw-amount"
                type="number"
                min={1}
                step={0.01}
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                disabled={loading}
                placeholder="0.00"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-4 text-sm font-medium tabular-nums text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* Percent chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {PERCENTS.map((p) => {
                const chipValue = Math.floor(accBal * p.value * 100) / 100;
                const active = amountNumber === chipValue;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => applyPercent(p.value)}
                    className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                      active
                        ? "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Security note */}
          <div className="flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-2.5 text-[12px] leading-relaxed text-indigo-900/70 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200/80">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            <span>
              For your security, please withdraw via the same method used for
              depositing. Need help?{" "}
              <Link
                href="/dashboard/help/support"
                className="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-700 dark:text-indigo-400"
              >
                Contact Support
              </Link>
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="h-11 flex-1 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleWithdraw}
              disabled={loading || !withdrawAmount}
              className="group relative h-11 flex-[2] overflow-hidden rounded-xl bg-slate-900 font-semibold text-white hover:bg-black disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
              />
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Proceed
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Withdrawl;