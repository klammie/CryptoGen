"use client";
import React, { useEffect, useState } from "react";
import { getCryptoAccount } from "@/app/lib/getCryptoAccount";
import Image from "next/image";

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
            mode: response.account.mode ?? "Unknown",
          });
        } else {
          setAccountData(null);
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Account Overview</h2>
        {accountData && (
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            accountData.mode === "Live" 
              ? "bg-green-50 text-green-700 ring-1 ring-green-600/20" 
              : "bg-gray-50 text-gray-700 ring-1 ring-gray-600/20"
          }`}>
            {accountData.mode} Mode
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center gap-4 w-full">
            <div className="h-48 w-full bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ) : accountData ? (
        <div className="flex-1 flex flex-col justify-between">
          <div className="relative w-full h-48 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl overflow-hidden shadow-lg">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium opacity-90">{accountData.type}</span>
                <div className="w-8 h-8 rounded-full bg-white/20 p-1 flex items-center justify-center">
                  <Image 
                    src={`/images/${accountData.image}.png`} 
                    alt={accountData.type} 
                    width={24} 
                    height={24} 
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Total Balance</p>
                <p className="text-3xl font-bold tracking-tight">
                  ${accountData.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center py-10">
          <div>
            <p className="text-gray-500 mb-2">No account found.</p>
            <p className="text-sm text-gray-400">Please add an account from the shop to get started.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardAccountCard;