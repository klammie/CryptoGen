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
import { ArrowDownToLine, CreditCard, Info, Loader2 } from "lucide-react";

const PRESETS = [50, 100, 500, 1000];

export function Deposit() {
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createPayment() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/payments/maxelpay/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.checkoutUrl !== "string") {
        throw new Error(result.error ?? "Unable to start payment");
      }
      window.location.assign(result.checkoutUrl);
    } catch (paymentError) {
      setError(
        paymentError instanceof Error ? paymentError.message : "Unable to start payment"
      );
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group relative h-10 overflow-hidden rounded-xl bg-white px-4 font-semibold text-slate-900 shadow-sm hover:bg-slate-100">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-indigo-200/50 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
          />
          <ArrowDownToLine className="mr-2 h-4 w-4 text-indigo-600" />
          Deposit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[440px] overflow-hidden rounded-2xl border-slate-200 p-0 dark:border-slate-800">
        {/* Accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

        <DialogHeader className="px-6 pb-2 pt-6">
          <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
            <ArrowDownToLine className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
            Deposit Funds
          </DialogTitle>
          <DialogDescription className="text-[13px] leading-relaxed">
            Complete your crypto payment securely through MaxelPay. Your balance
            updates instantly after confirmation.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 px-6 pb-6 pt-2">
          {/* Amount */}
          <div>
            <label
              htmlFor="deposit-amount"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Amount (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                $
              </span>
              <input
                id="deposit-amount"
                type="number"
                min={1}
                max={1000000}
                step={1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                disabled={loading}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-4 text-sm font-medium tabular-nums text-slate-900 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>

            {/* Preset chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                    amount === p
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                  }`}
                >
                  ${p.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-[13px] text-rose-600 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-400">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="flex items-start gap-2 rounded-xl border border-indigo-100 bg-indigo-50/70 px-3.5 py-2.5 text-[12px] leading-relaxed text-indigo-900/70 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-200/80">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
            Payments are processed securely through MaxelPay using cryptocurrency.
          </div>

          <Button
            onClick={createPayment}
            disabled={loading || amount < 1}
            className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-900 font-semibold text-white hover:bg-black disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
            />
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Opening checkout...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Continue to Payment
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}