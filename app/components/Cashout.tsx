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
import { Toaster, toast } from "sonner";
import AccountSelector from "./AccountSelector";
import { CashoutAction } from "../lib/CashoutAction";
import { deleteLiveAccount } from "../lib/deleteLiveAccount";
import { ArrowDownLeft, Wallet } from "lucide-react";

export function Cashout() {
  const [accBal, setAccBal] = useState<number>(1000);
  const [loading, setLoading] = useState(false);

  const handleCashout = async (amount: number) => {
    if (amount <= 0) {
      toast.error("Invalid account selection");
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
        toast.success("Funds successfully transferred to main balance!");
      } catch (deleteError) {
        console.error("Error deleting live account:", deleteError);
        toast.error("Funds transferred, but failed to close live account");
      }
    } catch (error) {
      console.error("Error updating account balance:", error);
      toast.error("Failed to transfer funds");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="rounded-xl h-10 px-4 font-medium" disabled={loading}>
            <ArrowDownLeft className="w-4 h-4 mr-2" />
            Cash Out
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Cash Out to Main Balance</DialogTitle>
            <DialogDescription>
              Transfer funds from your Live Trading Account back to your main wallet.
            </DialogDescription>
          </DialogHeader>

          {/* Balance Highlight */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <Wallet className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">Main Balance</p>
                <p className="text-lg font-bold text-gray-900">${accBal.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-gray-700 mb-3 block">Select Account to Cash Out</label>
            <AccountSelector onAccountSelect={handleCashout} />
          </div>
        </DialogContent>
      </Dialog>
      <Toaster richColors position="bottom-left" />
    </>
  );
}