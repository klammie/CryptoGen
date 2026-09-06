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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import NumberInput from "./AmountInput";
import { AlertCircle, ArrowUpRight } from "lucide-react";

const Withdrawl: React.FC = () => {
  const [accBal, setAccBal] = useState<number>(1000);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleWithdraw = async () => {
    const amountToWithdraw = Number(withdrawAmount);
    if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
      toast.error("Invalid withdrawal amount");
      return;
    }
    if (amountToWithdraw > accBal) {
      toast.error("Insufficient balance");
      return;
    }

    setLoading(true);
    const newBalance = accBal - amountToWithdraw;
    setAccBal(newBalance);
    
    const formData = new FormData();
    formData.set("valueToWithdraw", withdrawAmount);

    try {
      await WithdrawlAction(formData);
      toast.success("Withdrawal is being processed");
    } catch (error) {
      console.error("Failed to update account balance:", error);
      toast.error("Failed to process withdrawal");
      setAccBal(accBal); // Revert balance on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-xl h-10 px-4 font-medium">
          <ArrowUpRight className="w-4 h-4 mr-2" />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Withdraw Funds</DialogTitle>
          <DialogDescription>
            Transfer funds from your trading account to your bank or wallet.
          </DialogDescription>
        </DialogHeader>
        
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mt-2">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800 leading-relaxed">
            For your security, please withdraw via the same method used for depositing. 
            Need help?{" "}
            <Link href="/dashboard/help/support" className="font-semibold underline underline-offset-2">
              Contact Support
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (USD)</label>
          <NumberInput value={withdrawAmount} onChange={setWithdrawAmount} />
        </div>

        <DialogFooter className="mt-6 gap-3 sm:gap-0">
          <DialogClose asChild>
            <Button variant="ghost" className="rounded-xl">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleWithdraw} 
            disabled={loading || !withdrawAmount}
            className="rounded-xl px-6"
          >
            {loading ? "Processing..." : "Proceed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Withdrawl;