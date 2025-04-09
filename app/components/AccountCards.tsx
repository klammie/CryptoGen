"use client";
import React, { useState } from "react";
import { Check, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateKeyz } from "@/app/lib/UpdateKeyz"; // Ensure correct import path
import { toast, Toaster } from "sonner";
import { updateAccbal } from "../lib/updateAccountBalance";
import { error } from "console";
interface AccountCardProps {
  id: string;
  type: string;
  amount: number;
  image: string;
  features: string[];
  accountData: Array<{
    id: string;
    type: string;
    amount: number;
    image: string;
    features: string[];
  }>;
  selectedAmounts: { [key: string]: number };
  handleAmountChange: (type: string, amount: number) => void;
  setSelectedAccount: (account: any) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
  id,
  type,
  amount,
  image,
  features,
  accountData,
  selectedAmounts,
  handleAmountChange,
  setSelectedAccount,
}) => {
  const handleAddDemo = async () => {
    const accountData = { id, type, amount, image, features };
    const storedData = localStorage.getItem("DemoAccount");
    let demoAccounts = storedData ? JSON.parse(storedData) : [];

    if (!Array.isArray(demoAccounts)) {
      demoAccounts = [];
    }

    // Check if account ID already exists
    const accountExists = demoAccounts.some(
      (account: { id: string }) => account.id === id
    );
    if (accountExists) {
      toast.error("Account already exists!");
      return;
    }

    try {
      // Create formData for checking keyz balance
      const formData = new FormData();
      const response = await updateKeyz(formData);

      if (!response.success) {
        toast.error(response.message); // Shows "Insufficient Keys" if keyz is too low
        return; // Stop further execution if keys are insufficient
      }

      // Add the account if keyz is sufficient
      demoAccounts.push(accountData);
      localStorage.setItem("DemoAccount", JSON.stringify(demoAccounts));
      toast.success("Account added successfully!");
    } catch (error) {
      console.error("Error processing transaction:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const handleAddLive = async () => {
    const accountData = { id, type, amount, image, features };
    const storedData = localStorage.getItem("LiveAccount");
    let liveAccounts = storedData ? JSON.parse(storedData) : [];

    if (!Array.isArray(liveAccounts)) {
      liveAccounts = [];
    }

    // Check if account ID already exists
    const accountExists = liveAccounts.some(
      (account: { id: string }) => account.id === id
    );
    if (accountExists) {
      toast.error("Account already exists!");
      return;
    }

    // Create formData for checking balance
    const formData = new FormData();
    formData.set("totalAmount", amount.toString());

    try {
      // Call `updateAccbal` to check balance before proceeding
      const response = await updateAccbal(formData);

      if (response.success) {
        // Balance is sufficient, proceed with adding the account
        liveAccounts.push(accountData);
        localStorage.setItem("LiveAccount", JSON.stringify(liveAccounts));
        toast.success("Account added successfully!");
      } else {
        toast.error(response.message); // Shows "Insufficient Funds" if balance is too low
      }
    } catch (error) {
      console.error("Error processing transaction:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const [discountCode, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(amount);
  const [discountAmount, setDiscountAmount] = useState(0);
  const handleApplyDiscount = () => {
    const selectAmount = amount;
    if (discountCode == "DISCOUNT50") {
      setErrorMessage("");
      const discountAmount = selectAmount * 0.15;
      const totalAmount = amount - discountAmount;
      setDiscountAmount(discountAmount);
      setTotalAmount(totalAmount);
      toast.success("Discount Applied!");
      console.log("Discount Applied!");
    } else {
      setTotalAmount(amount);
      setDiscountAmount(0);
      toast.error("Invalid discount code");
      console.log("Invalid Discount Code", errorMessage);
    }
    setDiscountCode("");
  };

  return (
    <div className="card border rounded-lg p-6 m-4 shadow-md">
      <h2 className="text-lg font-semibold pb-2">{type}</h2>
      <img
        src={`/images/${image}.png`}
        alt={type}
        className="w-full h-auto rounded"
      />
      <div className="card-content mt-4">
        <p className="text-gray-600 text-xl font-bold">
          Amount: ${selectedAmounts[type]}
        </p>
        <ul>
          {features.map((feature, index) => (
            <li key={index} className="font-semibold items-center flex gap-2">
              <Check size={18} />
              {feature}
            </li>
          ))}
        </ul>
        <div className="relative mt-4">
          <div className="dropdown inline-block relative w-full">
            <button
              className="btn w-full outline dropdown-toggle"
              onClick={(e) => {
                const menu = e.currentTarget.nextElementSibling;
                menu.classList.toggle("hidden");
              }}
            >
              ${selectedAmounts[type]} <span className="caret"></span>
            </button>
            <ul className="dropdown-menu hidden text-gray-700 pt-1 w-full">
              {accountData
                .filter((account) => account.type === type)
                .map((account) => (
                  <li key={account.id} className="font-bold">
                    <a
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAmountChange(type, account.amount);
                        setSelectedAccount(account);
                        const menu = e.currentTarget.closest("ul");
                        menu.classList.add("hidden");
                      }}
                    >
                      {account.amount}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4">
          <button
            className="bg-[#ff7f51] flex-end mr-4 text-white px-4 py-2 rounded hover:bg-orange-600"
            onClick={handleAddDemo}
          >
            <KeyRound />
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn btn-primary w-full">Add to Cart</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
              <form action={updateAccbal}>
                <DialogTitle>Checkout</DialogTitle>
                <DialogHeader className="flex flex-row justify-center items-center">
                  <img
                    src={`/images/${image}.png`}
                    alt={`${type} account`}
                    className="w-1/2 h-auto"
                  />
                </DialogHeader>
                <div className="flex flex-col mt-5">
                  <div className="my-3">
                    <p className="font-semibold text-lg">
                      Amount: ${selectedAmounts[type]}
                    </p>
                    <p className="mb-4">
                      If you have a Discount code, please enter it below.
                    </p>
                    <input
                      className="py-1 mr-6"
                      type="text"
                      placeholder="Enter Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                    />
                    <Button onClick={handleApplyDiscount}>Apply</Button>
                  </div>
                  <div className="border flex justify-between px-2 py-2 mt-10">
                    <div className="flex flex-col">
                      <p className="font-semibold">Item:</p>
                      <p className="font-semibold">Discount:</p>
                      <p className="font-semibold">Total:</p>
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="font-semibold">
                        {type} {selectedAmounts[type]}
                      </p>
                      <p className="font-semibold text-green-600">
                        ${discountAmount}
                      </p>
                      <p className="font-bold text-blue-500">${totalAmount}</p>
                    </div>
                  </div>
                </div>
                <input type="hidden" name="totalAmount" value={totalAmount} />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddLive();
                  }}
                >
                  Proceed
                </Button>
              </form>
            </DialogContent>
          </Dialog>
          <Toaster richColors position="bottom-left" />
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
