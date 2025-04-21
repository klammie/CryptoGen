"use client";
import React, { useState } from "react";
import AccountCard from "@/app/components/AccountCards";
import { Account } from "../trades/TradeSim";

const accountData = [
  {
    id: "1000L",
    type: "Passive",
    amount: 1000,
    image: "6073703",
    features: [
      "3+ Instruments to trade",
      "Bonus instruments",
      "Beginner Friendly",
      "5% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "3000L",
    type: "Passive",
    amount: 3000,
    image: "6073703",
    features: [
      "3+ Instruments to trade",
      "Bonus instruments",
      "Beginner Friendly",
      "5% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "5000L",
    type: "Passive",
    amount: 5000,
    image: "6073703",
    features: [
      "4+ Instruments to trade",
      "Bonus instruments",
      "Beginner Friendly",
      "5% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "10000L",
    type: "Semi-Aggressive",
    amount: 10000,
    image: "6004872",
    features: [
      "5+ Instruments to trade",
      "Bonus instruments",
      "Pros and Beginner Friendly",
      "Mt4 & Mt5 Investor Account login",
      "10% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "20000L",
    type: "Semi-Aggressive",
    amount: 20000,
    image: "6004872",
    features: [
      "5+ Instruments to trade",
      "Bonus instruments",
      "Pros and Beginner Friendly",
      "Mt4 & Mt5 Investor Account login",
      "10% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "30000L",
    type: "Semi-Aggressive",
    amount: 30000,
    image: "6004872",
    features: [
      "6+ Instruments to trade",
      "Bonus instruments",
      "Suited for Pros",
      "Mt4 & Mt5 Investor Account login",
      "15% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "50000L",
    type: "Aggressive",
    amount: 50000,
    image: "6004210",
    features: [
      "8+ Instruments to trade",
      "Bonus instruments",
      "Commercial Accounts Available",
      "Elite Customer Support",
      "Mt4 & Mt5 Investor Account login",
      "20% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "100000L",
    type: "Aggressive",
    amount: 100000,
    image: "6004210",
    features: [
      "8+ Instruments to trade",
      "Bonus instruments",
      "Commercial Accounts Available",
      "Elite Customer Support",
      "Mt4 & Mt5 Investor Account login",
      "20% Deposit Bonus",
    ],
    isActive: false,
  },
  {
    id: "200000L",
    type: "Aggressive",
    amount: 200000,
    image: "6004210",
    features: [
      "12+ Instruments to Trade",
      "Commercial Accounts Available",
      "Mt4 & Mt5 Investor Account login",
      "30% Deposit Bonus",
    ],
    isActive: false,
  },
];

const initialState: Record<string, number> = {
  Passive: 1000,
  "Semi-Aggressive": 10000,
  Aggressive: 50000,
};

export default function Shoproute() {
  const [selectedAmounts, setSelectedAmounts] = useState(initialState);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleAmountChange = (type: string, amount: number) => {
    setSelectedAmounts((prevState) => ({
      ...prevState,
      [type]: amount,
    }));
  };

  const filteredAccounts = accountData.filter(
    (account) =>
      account.amount ===
      selectedAmounts[account.type as keyof typeof selectedAmounts]
  );

  return (
    <div className="shoproute mx-auto p-8 xl:flex gap-3">
      {filteredAccounts.map((item) => (
        <AccountCard
          key={item.id}
          id={item.id}
          type={item.type}
          amount={item.amount}
          image={item.image}
          features={item.features}
          accountData={accountData}
          selectedAmounts={selectedAmounts}
          handleAmountChange={handleAmountChange}
          selectedAccount={selectedAccount} // ✅ Now correctly defined
          setSelectedAccount={setSelectedAccount}
        />
      ))}
    </div>
  );
}
