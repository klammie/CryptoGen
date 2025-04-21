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
  selectedAccount: Account | null; // ✅ Correct type
  setSelectedAccount: (account: Account) => void; // Explicitly typed
}

const AccountCard: React.FC<AccountCardProps> = ({
  type,
  amount,
  image,
  features,
  accountData,
  selectedAmounts,
  handleAmountChange,
  selectedAccount,
  setSelectedAccount,
}) => {
  const handleAddDemo = async (accountData: {
    type: string;
    amount: number;
    image: string;
    isActive: boolean;
  }) => {
    try {
      const userId = await getUserId();

      if (!userId) {
        toast.error("User authentication failed.");
        console.error("User authentication failed.");
        return;
      }

      const response = await addDemoAccount({
        type: accountData.type,
        amount: accountData.amount,
        image: accountData.image,
        isActive: false,
      });

      if (response.success) {
        console.log("Demo account added:", response.newAccount);

        const keyUpdateResponse = await updateKeyz(); // ✅ Check keys after adding

        if (keyUpdateResponse.success) {
          toast.success("Demo account added successfully!");
        } else {
          toast.error("Insufficient keys to add demo account.");
        }
      } else {
        toast.error("Error adding demo account.");
        console.error("Error adding demo account:", response.error);
      }
    } catch (error) {
      toast.error("Unexpected error occurred while adding demo account.");
      console.error("Error adding demo account:", error);
    }
  };

  const handleAddLive = async (accountData: {
    type: string;
    amount: number;
    image: string;
    isActive: boolean;
  }) => {
    try {
      const userId = await getUserId();

      if (!userId) {
        toast.error("User authentication failed.");
        console.error("User authentication failed.");
        return;
      }

      const response = await addLiveAccount({
        type: accountData.type,
        amount: accountData.amount,
        image: accountData.image,
        isActive: false,
      });

      if (response.success) {
        toast.success("Live account added successfully!");
        console.log("Live account added:", response.newAccount);
      } else {
        toast.error("Insufficient funds to add live account.");
        console.error("Error adding live account:", response.error);
      }
    } catch (error) {
      toast.error("Unexpected error occurred while adding live account.");
      console.error("Error adding live account:", error);
    }
  };

  const [discountCode, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(amount);
  const [discountAmount, setDiscountAmount] = useState(0);
  const handleApplyDiscount = () => {
    const selectAmount = amount;
    if (discountCode == "CRYPTOGEN25") {
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
      <Image
        src={`/images/${image}.png`}
        alt={`${selectedAccount ? selectedAccount.type : type}`}
        className="w-full h-auto rounded"
        width={800}
        height={400}
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
                const menu = e.currentTarget
                  .nextElementSibling as HTMLElement | null;
                if (menu) {
                  menu.classList.toggle("hidden");
                }
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

                        const menu = e.currentTarget.closest(
                          "ul"
                        ) as HTMLElement | null;
                        if (menu) {
                          menu.classList.add("hidden");
                        }
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
          {/*THIS BUTTON ELEMENT SHOULD BE INSIDE A FORM*/}
          <form>
            <button
              className="bg-[#ff7f51] flex-end mr-4 text-white px-4 py-2 rounded hover:bg-orange-600"
              onClick={() =>
                handleAddDemo({
                  type,
                  amount,
                  image,
                  isActive: false,
                })
              }
            >
              <KeyRound />
            </button>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="btn btn-primary w-full">Add to Cart</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[360px]">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const response = await updateAccbal(formData); // Call it manually
                  console.log(response);
                }}
              >
                <DialogTitle>Checkout</DialogTitle>
                <DialogHeader className="flex flex-row justify-center items-center">
                  <Image
                    src={`/images/${image}.png`}
                    alt={`${type} account`}
                    width={400}
                    height={200}
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
                  onClick={() =>
                    handleAddLive({
                      type,
                      amount,
                      image,
                      isActive: false,
                    })
                  }
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
