"use client";

import React, { useState } from "react";
import { Check, KeyRound, ShoppingCart, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast, Toaster } from "sonner";
import { updateAccbal } from "../lib/updateAccountBalance";
import Image from "next/image";
import { addDemoAccount } from "@/app/lib/addDemoAccount";
import { addLiveAccount } from "@/app/lib/addLiveAccount";
import { getUserId } from "../lib/getUserId";
import { Account } from "../dashboard/trades/TradeSim";

interface AccountCardProps {
  id: string;
  type: string;
  amount: number;
  image: string;
  features: string[];
  accountData: Account[];
  selectedAmounts: { [key: string]: number };
  handleAmountChange: (type: string, amount: number) => void;
  selectedAccount: Account | null;
  setSelectedAccount: (account: Account) => void;
  cryptoId: string;
}

const AccountCard: React.FC<AccountCardProps> = ({
  type,
  amount,
  image,
  features,
  accountData,
  selectedAmounts,
  handleAmountChange,
  setSelectedAccount,
  cryptoId,
}) => {
  const [discountCode, setDiscountCode] = useState("");
  const [totalAmount, setTotalAmount] = useState(amount);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isAddingDemo, setIsAddingDemo] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get all available amounts for this specific account type
  const availableAmounts = accountData
    .filter((acc) => acc.type === type)
    .map((acc) => acc.amount)
    .sort((a, b) => a - b);

  const currentSelectedAmount = selectedAmounts[type] || amount;

  const handleAddDemo = async () => {
    setIsAddingDemo(true);
    try {
      const userId = await getUserId();
      if (!userId) {
        toast.error("User authentication failed.");
        return;
      }

      const response = await addDemoAccount({
        type,
        amount: currentSelectedAmount,
        image,
        isActive: false,
        cryptoId: String(cryptoId),
      });

      if (response.success) {
        toast.success("Demo account added successfully!");
      } else {
        toast.error("Failed to add demo account.");
      }
    } catch {
      toast.error("An error occurred while adding the demo account.");
    } finally {
      setIsAddingDemo(false);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "CRYPTOGEN25") {
      const discount = currentSelectedAmount * 0.15;
      setDiscountAmount(discount);
      setTotalAmount(currentSelectedAmount - discount);
      toast.success("15% Discount Applied!");
    } else {
      setDiscountAmount(0);
      setTotalAmount(currentSelectedAmount);
      toast.error("Invalid discount code");
    }
    setDiscountCode("");
  };

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const formData = new FormData(e.currentTarget);
      await updateAccbal(formData);
      await addLiveAccount({
        type,
        amount: currentSelectedAmount,
        image,
        isActive: false,
        cryptoId: String(cryptoId),
      });
      toast.success("Account purchased successfully!");
    } catch {
      toast.error("Failed to process purchase. Please check your funds.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Badge style on the dark panel, based on account type
  const getBadgeStyle = () => {
    switch (type) {
      case "Passive":
        return "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30";
      case "Semi-Aggressive":
        return "bg-amber-500/15 text-amber-300 ring-amber-400/30";
      case "Aggressive":
        return "bg-rose-500/15 text-rose-300 ring-rose-400/30";
      default:
        return "bg-white/10 text-slate-300 ring-white/15";
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
      {/* ── Dark bank-style panel (matches AccountOverview) ── */}
      <div className="relative m-5 mb-0 overflow-hidden rounded-2xl bg-slate-900 p-5 text-white dark:border dark:border-slate-700/60">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-indigo-500/25 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-purple-500/15 blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <span
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ${getBadgeStyle()}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {type}
            </span>

            {/* Image chip — same frosted style as AccountOverview */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur">
              <Image
                src={`/images/${image}.png`}
                alt={`${type} account`}
                width={34}
                height={34}
                className="object-contain"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400">
              Account Capital
            </p>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold tracking-tight tabular-nums">
                ${currentSelectedAmount.toLocaleString()}
              </span>
              <span className="text-[12px] font-medium text-slate-400">/ account</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-5">
        {/* Capital selector */}
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          Select Capital
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {availableAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => {
                handleAmountChange(type, amt);
                setTotalAmount(amt);
                setDiscountAmount(0);
              }}
              className={`rounded-lg border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
                currentSelectedAmount === amt
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-600/25"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300"
              }`}
            >
              ${amt.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Features */}
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          What&apos;s included
        </p>
        <ul className="mb-6 flex-1 space-y-2.5">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-sm text-slate-600 dark:text-slate-300"
            >
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="space-y-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-900 font-semibold text-white hover:bg-black dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                onClick={() =>
                  setSelectedAccount({
                    ...accountData.find((a) => a.amount === currentSelectedAmount)!,
                  })
                }
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
                />
                <ShoppingCart className="mr-2 h-4 w-4" />
                Purchase Live Account
              </Button>
            </DialogTrigger>

            {/* ── Checkout modal ── */}
            <DialogContent className="sm:max-w-[440px] overflow-hidden rounded-2xl border-slate-200 p-0 dark:border-slate-800">
              <div className="h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />

              <DialogHeader className="px-6 pb-2 pt-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                  <ShoppingCart className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <DialogTitle className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
                  Order Summary
                </DialogTitle>
                <DialogDescription className="text-[13px] leading-relaxed">
                  Review your order and complete the purchase to activate your live
                  account.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCheckout} className="space-y-5 px-6 pb-6 pt-2">
                {/* Item */}
                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-700 dark:bg-slate-800/50">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
                    <Image
                      src={`/images/${image}.png`}
                      alt={type}
                      width={26}
                      height={26}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {type} Account
                    </p>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400">
                      Capital: ${currentSelectedAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Discount code */}
                <div>
                  <label
                    htmlFor="discount-code"
                    className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Discount Code
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="discount-code"
                        type="text"
                        placeholder="Enter code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/25 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyDiscount}
                      className="rounded-xl border-slate-200 px-4 font-semibold text-slate-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Pricing breakdown */}
                <div className="space-y-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                    <span className="tabular-nums text-slate-900 dark:text-white">
                      ${currentSelectedAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Discount</span>
                    <span className="font-medium tabular-nums text-emerald-600 dark:text-emerald-400">
                      -${discountAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold dark:border-slate-800">
                    <span className="text-slate-900 dark:text-white">Total</span>
                    <span className="tabular-nums text-slate-900 dark:text-white">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <input type="hidden" name="totalAmount" value={totalAmount} />

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="group relative h-11 w-full overflow-hidden rounded-xl bg-slate-900 font-semibold text-white hover:bg-black disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]"
                  />
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${totalAmount.toLocaleString()}`
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            className="h-11 w-full rounded-xl border-slate-200 font-medium text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-300"
            onClick={handleAddDemo}
            disabled={isAddingDemo}
          >
            {isAddingDemo ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <KeyRound className="mr-2 h-4 w-4" />
                Add Free Demo
              </>
            )}
          </Button>
        </div>
      </div>

      <Toaster richColors position="bottom-left" />
    </div>
  );
};

export default AccountCard;