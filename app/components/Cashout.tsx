"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Toaster, toast } from "sonner";
import AccountSelector from "./AccountSelector";
import { CashoutAction } from "../lib/CashoutAction"; // Adjust path accordingly
import { deleteLiveAccount } from "../lib/deleteLiveAccount";
export function Cashout() {
  const [accBal, setAccBal] = useState<number>(1000); // Initialize balance with a sample value

  const handleCashout = async (amount: number) => {
    if (amount <= 0) {
      toast.error("Invalid account selection");
      return;
    }

    const formData = new FormData();
    formData.set("valueToAdd", amount.toString());

    try {
      const updatedAccount = await CashoutAction(formData);

      if (!updatedAccount) {
        throw new Error("Cashout failed or returned an error");
      }

      console.log("Updated account balance:", updatedAccount);
      setAccBal((prev) => prev + amount); // Increment accBal after successful transaction

      // ✅ Safely attempt to delete live account after success
      try {
        await deleteLiveAccount();
        toast.success("Funds successfully transferred!");
      } catch (deleteError) {
        console.error("Error deleting live account:", deleteError);
        toast.error("Funds transferred, but failed to delete live account");
      }
    } catch (error) {
      console.error("Error updating account balance:", error);
      toast.error("Failed to transfer funds");
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-2xl">Cash Out</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[360px]">
          <DialogTitle>Cash Out</DialogTitle>
          <DialogHeader className="flex flex-row justify-center items-center">
            Transfer funds from your Live Trading Account to Main Balance
          </DialogHeader>

          {/* ✅ Displaying accBal so it's used */}
          <div className="text-lg font-bold text-gray-700">
            Main Balance: ${accBal}
          </div>

          <AccountSelector onAccountSelect={handleCashout} />
        </DialogContent>
      </Dialog>
      <Toaster richColors position="bottom-left" />
    </div>
  );
}
