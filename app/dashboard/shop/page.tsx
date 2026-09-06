"use client";
import React, { useState } from "react";
import AccountCard from "@/app/components/AccountCards";
import { Account } from "../trades/TradeSim";
import { Sparkles } from "lucide-react";

const accountData: Account[] = [
  // Passive
  { id: "1000L", type: "Passive", amount: 1000, image: "6073703", features: ["3+ Instruments to trade", "Bonus instruments", "Beginner Friendly", "5% Deposit Bonus"], isActive: false, cryptoId: "1000L" },
  { id: "3000L", type: "Passive", amount: 3000, image: "6073703", features: ["3+ Instruments to trade", "Bonus instruments", "Beginner Friendly", "5% Deposit Bonus"], isActive: false, cryptoId: "3000L" },
  { id: "5000L", type: "Passive", amount: 5000, image: "6073703", features: ["4+ Instruments to trade", "Bonus instruments", "Beginner Friendly", "5% Deposit Bonus"], isActive: false, cryptoId: "5000L" },
  
  // Semi-Aggressive
  { id: "10000L", type: "Semi-Aggressive", amount: 10000, image: "6004872", features: ["5+ Instruments to trade", "Bonus instruments", "Pros and Beginner Friendly", "Mt4 & Mt5 Investor Account login", "10% Deposit Bonus"], isActive: false, cryptoId: "10000L" },
  { id: "20000L", type: "Semi-Aggressive", amount: 20000, image: "6004872", features: ["5+ Instruments to trade", "Bonus instruments", "Pros and Beginner Friendly", "Mt4 & Mt5 Investor Account login", "10% Deposit Bonus"], isActive: false, cryptoId: "20000L" },
  { id: "30000L", type: "Semi-Aggressive", amount: 30000, image: "6004872", features: ["6+ Instruments to trade", "Bonus instruments", "Suited for Pros", "Mt4 & Mt5 Investor Account login", "15% Deposit Bonus"], isActive: false, cryptoId: "30000L" },
  
  // Aggressive
  { id: "50000L", type: "Aggressive", amount: 50000, image: "6004210", features: ["8+ Instruments to trade", "Bonus instruments", "Commercial Accounts Available", "Elite Customer Support", "Mt4 & Mt5 Investor Account login", "20% Deposit Bonus"], isActive: false, cryptoId: "50000L" },
  { id: "100000L", type: "Aggressive", amount: 100000, image: "6004210", features: ["8+ Instruments to trade", "Bonus instruments", "Commercial Accounts Available", "Elite Customer Support", "Mt4 & Mt5 Investor Account login", "20% Deposit Bonus"], isActive: false, cryptoId: "100000L" },
  { id: "200000L", type: "Aggressive", amount: 200000, image: "6004210", features: ["12+ Instruments to Trade", "Commercial Accounts Available", "Mt4 & Mt5 Investor Account login", "30% Deposit Bonus"], isActive: false, cryptoId: "200000L" },
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

  // Filter accounts to show only the currently selected amount for each type
  const filteredAccounts = accountData.filter(
    (account) => account.amount === selectedAmounts[account.type as keyof typeof selectedAmounts]
  );

  // Sort to ensure consistent order: Passive, Semi-Aggressive, Aggressive
  const order = ["Passive", "Semi-Aggressive", "Aggressive"];
  filteredAccounts.sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Premium Trading Accounts
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Choose Your Trading Strategy
          </h1>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl">
            Select the perfect trading account tailored to your experience level and risk appetite. Upgrade or change your capital at any time.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredAccounts.map((item) => (
            <AccountCard
              key={item.id}
              id={item.id}
              type={item.type}
              amount={item.amount}
              image={item.image}
              features={item.features ?? []}
              accountData={accountData}
              selectedAmounts={selectedAmounts}
              handleAmountChange={handleAmountChange}
              selectedAccount={selectedAccount}
              setSelectedAccount={setSelectedAccount}
              cryptoId={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}