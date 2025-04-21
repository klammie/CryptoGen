"use client";
import React, { useEffect, useState } from "react";

import ToggleTrade from "@/app/components/ToggleTrade";
import TradeDisplay from "@/app/dashboard/trades/TradeDisplay";
import { Toaster } from "sonner";
import InvestorConnector from "@/app/components/InvestorConnector";
import Image from "next/image";
import { Account } from "../dashboard/trades/TradeSim";
import { getLiveAccount } from "../lib/getLiveAccount";

const LiveAccount: React.FC = () => {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getLiveAccount(); // ✅ Fetch from DB
        console.log("Fetched accounts:", response); // 🔍 Debugging log

        if (response.success && Array.isArray(response.liveAccount)) {
          setAccountData(response.liveAccount); // ✅ Extracts array before setting state
          console.log("State updated:", response.liveAccount);
        } else {
          setAccountData([]); // ✅ Ensures state isn't mistakenly set to an object
        }
      } catch (err) {
        console.error("Error fetching crypto accounts:", err);
        setError("Failed to fetch account data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // ✅ Log state updates for debugging
  useEffect(() => {
    console.log("State actually updated:", accountData);
  }, [accountData]);

  return (
    <div className="mx-auto">
      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-600 mt-10">
          Loading accounts...
        </p>
      ) : error ? (
        <p className="text-center text-lg font-semibold text-red-600 mt-10">
          {error}
        </p>
      ) : accountData.length === 0 ? (
        <p className="text-center text-lg font-semibold text-gray-600 mt-10">
          No live accounts found. Add an account to get started!
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
                <div className="absolute top-5 left-1/2 bg-opacity-80 transform -translate-x-1/2 bg-blue-600 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                  Live
                </div>

                <Image
                  src={`/images/${account.image}.png`}
                  alt={account.type}
                  width={800}
                  height={600}
                  className="rounded"
                />

                <div className="flex justify-between items-center mt-2">
                  <ToggleTrade account={account} />
                  <InvestorConnector />
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

export default LiveAccount;
