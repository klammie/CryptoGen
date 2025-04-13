"use client";
import React, { useEffect, useState } from "react";

import TradeDisplay from "@/app/dashboard/trades/TradeDisplay";
import { Toaster } from "sonner";
import ToggleTrade from "@/app/components/ToggleTrade";
import InvestorConnector from "@/app/components/InvestorConnector";
import Image from "next/image";

interface Account {
  id: string;
  type: string;
  amount: number;
  image: string;
}

const LiveAccount: React.FC = () => {
  const [accountData, setAccountData] = useState<Account[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("LiveAccount");
    console.log("LiveAccount data from localStorage:", storedData); // Debugging
    if (storedData) {
      const parsedData: Account[] = JSON.parse(storedData);
      if (Array.isArray(parsedData)) {
        setAccountData(parsedData);
      }
    }
  }, []);

  if (accountData.length === 0) {
    return (
      <p className="flex items-center justify-center pt-10 font-semibold">
        No Live Account found, Pleae add an account from the Shop.
      </p>
    );
  }

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
        {accountData.map((account, index) => (
          <div
            key={index}
            className="card border relative rounded-lg p-6 m-4 shadow-md"
          >
            <div className="absolute top-5 left-1/2 bg-opacity-80 transform -translate-x-1/2 bg-blue-600 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md">
              Live
            </div>
            <Image
              src={`/images/${account.image}.png`}
              alt={account.type}
              width={800}
              height={600}
              className="w-full h-auto rounded"
            />
            <div className="flex justify-between items-center">
              <ToggleTrade account={account} />
              <div>
                <InvestorConnector />
              </div>
            </div>
            <div className="card-content mt-4 relative">
              <h1 className="absolute bottom-40 left-2 text-white font-semibold drop-shadow-md bg-clip-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                ${account.amount.toFixed(2)}
              </h1>
              <p className="absolute bottom-32 left-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-gray-100">
                {account.type}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <TradeDisplay />
      </div>
      <Toaster position="bottom-left" richColors />
    </div>
  );
};

export default LiveAccount;
