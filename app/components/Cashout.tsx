"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AccountSelector from "./AccountSelector";
import { CashoutAction } from "../lib/CashoutAction";
import { deleteLiveAccount } from "../lib/deleteLiveAccount";
import { AlertTriangle, ArrowDownLeft, Wallet } from "lucide-react";

export function Cashout() {
  const [accBal, setAccBal] = useState<number>(1000);
  const [loading, setLoading] = useState(false);

  const handleCashout = async (amount: number) => {
    if (amount <= 0) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.set("valueToAdd", amount.toString());
    try {
      const updatedAccount = await CashoutAction(formData);
      if (!updatedAccount) throw new Error("Cashout failed");
      setAccBal((prev) => prev + amount);
      try {
        await deleteLiveAccount();
      } catch (deleteError) {
        console.error("Error deleting live account:", deleteError);
      }
    } catch (error) {
      console.error("Error updating account balance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          disabled={loading}
          className="group relative h-10 overflow-hidden rounded-xl border-indigo-400/30 bg-indigo-500/15 px-4 font-semibold text-indigo-100 backdrop-blur hover:bg-indigo-500/25 hover:text-white"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
          />
          <ArrowDownLeft className="mr-2 h-4 w-4 text-indigo-300" />
          Cash Out
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px] overflow-hidden rounded-2xl border-slate-200 p-0 dark:border-slate-800">
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        <DialogHeader className="px-6 pb-2 pt-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-purple-100 bg-purple-50 dark:border-purple-500/20 dark:bg-purple-500/10">
            <ArrowDownLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Cash Out to Main Balance
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Transfer funds from your Live Trading Account back to your main wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 pb-6 pt-2">
          {/* Main balance highlight */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 dark:border-slate-700 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                <Wallet className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Main Balance
                </p>
                <p className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                  ${accBal.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Account selector */}
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Select account to cash out
            </label>
            <AccountSelector onAccountSelect={handleCashout} />
          </div>

          {/* Warning note */}
          <div className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-[12px] leading-relaxed text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200/90">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            Cashing out transfers the full live account balance to your main wallet
            and closes the live account.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}