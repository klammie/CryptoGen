"use client";

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

import ToggleTrade from "./ToggleTrade";
import TradeDisplay from "../dashboard/trades/TradeDisplay";
import { Toaster } from "sonner";
import { ConfirmDelete } from "./ConfirmDelete";

const DemoAccount: React.FC = () => {
  const [accountData, setAccountData] = useState<Array<any>>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("DemoAccount");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (Array.isArray(parsedData) && parsedData.length > 0) {
        setAccountData(parsedData);
      }
    }
  }, []);

  return (
    <div className="mx-auto">
      {accountData.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-600 mt-10">
          No demo accounts found. Add an account to get started!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
            {accountData.map((account) => (
              <div
                key={account.id}
                className="relative card border rounded-lg p-6 m-4 shadow-md"
              >
                {/* Label positioned top-center */}
                <div className="absolute top-5 left-1/2 bg-opacity-80 transform -translate-x-1/2 bg-gray-600 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                  Demo
                </div>

                <img
                  src={`/images/${account.image}.png`}
                  alt={account.type}
                  className="w-full h-auto rounded"
                />

                <div className="flex justify-between items-center mt-2">
                  <ToggleTrade account={account} />
                  <ConfirmDelete
                    accountData={accountData}
                    setAccountData={setAccountData}
                    accountId={account.id}
                  />
                </div>

                <div className="card-content mt-4 relative">
                  <h1 className="absolute bottom-40 left-2 text-white transform font-semibold drop-shadow-md bg-clip-text text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
                    ${account.amount.toFixed(2)}
                  </h1>
                  <p className="absolute bottom-32 left-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-gray-100">
                    {account.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <TradeDisplay />
          </div>
          <Toaster position="bottom-left" richColors />
        </>
      )}
    </div>
  );
};

export default DemoAccount;
