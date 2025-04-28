"use client"; // Required for client-side execution
import React, { useEffect, useState } from "react";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount"; // Import function
import Image from "next/image"; // ✅ Restored optimized Next.js Image component

interface Account {
  id: string;
  mode: string;
  type: string;
  amount: number;
  image: string;
}

const DashboardAccountCard: React.FC = () => {
  const [accountData, setAccountData] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const response = await getCryptoAccount();

        if (response.success && response.account) {
          setAccountData({
            ...response.account,
            mode: response.account.mode ?? "Unknown", // ✅ Ensure a valid mode is set
          });
        } else {
          setAccountData(null);
          console.error("Error fetching account data:", response.error);
        }
      } catch (error) {
        console.error("Database fetch error:", error);
        setAccountData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, []);

  return (
    <div className="my-8 mx-auto xl:ml-20 justify-center">
      <h2 className="text-xl flex justify-center font-semibold mb-4">
        Accounts
      </h2>

      {loading ? (
        <p>Loading account data...</p>
      ) : accountData ? (
        <div className="flex flex-row gap-5">
          {/* ✅ Restored flex layout */}
          <div className="relative shadow-lg rounded-xl overflow-hidden bg-white">
            <div
              className={`absolute top-1 left-1/2 transform -translate-x-1/2  py-1 bg-opacity-80 rounded-full px-4 text-sm font-semibold shadow-md ${
                accountData.mode === "Live"
                  ? "bg-blue-600 text-white"
                  : accountData.mode === "Demo"
                  ? "bg-gray-600 text-white"
                  : "bg-red-600 text-white" // ✅ Fallback for undefined mode
              }`}
            >
              {accountData.mode}
            </div>
            <Image
              src={`/images/${accountData.image}.png`}
              alt={accountData.type} // ✅ Replace `type` with `mode`
              width={400}
              height={300}
              className="rounded"
            />
            <p className="absolute top-10 left-24 transform -translate-x-1/2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
              ${accountData.amount.toFixed(2)}
            </p>
            <p className="absolute top-20 left-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-gray-100">
              {accountData.type}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">
          No account found. Please add an account from the shop.
        </p>
      )}
    </div>
  );
};

export default DashboardAccountCard;
