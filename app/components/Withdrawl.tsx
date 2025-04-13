"use client";

import React, { useState } from "react";
import { WithdrawlAction } from "../lib/Withdrawlaction"; // Adjust file name accordingly
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Ensure you have toast notifications
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import NumberInput from "./AmountInput";

const Withdrawl: React.FC = () => {
  const [accBal, setAccBal] = useState<number>(1000); // Example account balance
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");

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

    const newBalance = accBal - amountToWithdraw;
    setAccBal(newBalance);
    toast.success("Withdrawal is being processed");

    const formData = new FormData();
    formData.set("valueToWithdraw", withdrawAmount);

    try {
      const updatedAccount = await WithdrawlAction(formData);
      console.log("Updated account:", updatedAccount);
    } catch (error) {
      console.error("Failed to update account balance:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl">Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle>Withdraw</DialogTitle>
        <DialogHeader className="flex flex-row justify-center items-center">
          <h3>
            <span className="font-semibold">Please note:</span> To keep your
            money safe, we encourage you to withdraw via the same method you
            used for depositing funds. If you can&apos;t use this method
            anymore, contact our{" "}
            <span className="text-blue-500">
              <Link href="/dashboard/help/support">Customer Support</Link>
            </span>
            . Withdrawal usually takes 1-3 hours but sometimes may take up to 3
            business days.
          </h3>
        </DialogHeader>

        <NumberInput value={withdrawAmount} onChange={setWithdrawAmount} />
        <div className="mt-5">
          <DialogClose asChild>
            <Button onClick={handleWithdraw}>Proceed</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Withdrawl;
