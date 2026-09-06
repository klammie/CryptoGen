"use client";
import React, { useState } from "react";
import { Check, KeyRound, ShoppingCart, Tag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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

  // Badge color based on account type
  const getBadgeStyle = () => {
    switch (type) {
      case "Passive":
        return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
      case "Semi-Aggressive":
        return "bg-amber-50 text-amber-700 ring-amber-600/20";
      case "Aggressive":
        return "bg-rose-50 text-rose-700 ring-rose-600/20";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full overflow-hidden">
      {/* Card Header / Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 border-b border-gray-100">
        <span className={`absolute top-4 left-4 px-2.5 py-1 text-xs font-semibold rounded-full ring-1 ${getBadgeStyle()}`}>
          {type}
        </span>
        <Image
          src={`/images/${image}.png`}
          alt={`${type} account`}
          width={160}
          height={160}
          className="object-contain drop-shadow-sm"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Price & Amount Selector */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-4xl font-bold text-gray-900 tracking-tight">
              ${currentSelectedAmount.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-500">/ account</span>
          </div>
          
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Select Capital</p>
          <div className="flex flex-wrap gap-2">
            {availableAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => {
                  handleAmountChange(type, amt);
                  setTotalAmount(amt);
                  setDiscountAmount(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentSelectedAmount === amt
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ${amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Features List */}
        <div className="flex-1 mb-6">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">What&apos;s included</p>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700">
                <Check className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3 mt-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full h-11 rounded-xl font-semibold shadow-sm"
                onClick={() => setSelectedAccount({ ...accountData.find(a => a.amount === currentSelectedAmount)! })}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Purchase Live Account
              </Button>
            </DialogTrigger>
            
            {/* Checkout Dialog */}
            <DialogContent className="sm:max-w-[425px] rounded-2xl p-0 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-gray-900">Order Summary</DialogTitle>
                </DialogHeader>
              </div>
              
              <form onSubmit={handleCheckout} className="p-6 space-y-6">
                {/* Item Details */}
                <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image src={`/images/${image}.png`} alt={type} width={32} height={32} className="object-contain" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{type} Account</p>
                    <p className="text-sm text-gray-500">Capital: ${currentSelectedAmount.toLocaleString()}</p>
                  </div>
                </div>

                {/* Discount Code */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">Discount Code</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleApplyDiscount}
                      className="px-4 rounded-lg"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${currentSelectedAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-emerald-600 font-medium">-${discountAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>${totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <input type="hidden" name="totalAmount" value={totalAmount} />
                
                <Button 
                  type="submit" 
                  className="w-full h-11 rounded-xl font-semibold" 
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    `Pay $${totalAmount.toLocaleString()}`
                  )}
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          <Button 
            variant="outline" 
            className="w-full h-11 rounded-xl font-medium text-gray-700 hover:bg-gray-50"
            onClick={handleAddDemo}
            disabled={isAddingDemo}
          >
            {isAddingDemo ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding...</>
            ) : (
              <><KeyRound className="w-4 h-4 mr-2" /> Add Free Demo</>
            )}
          </Button>
        </div>
      </div>
      <Toaster richColors position="bottom-left" />
    </div>
  );
};

export default AccountCard;