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
      console.log("Updated account balance:", updatedAccount);
      setAccBal((prev) => prev + amount); // Increment accBal after successful transaction
      toast.success("Funds successfully transferred!");
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

          <AccountSelector onAccountSelect={handleCashout} />
        </DialogContent>
      </Dialog>
      <Toaster richColors position="bottom-left" />
    </div>
  );
}
