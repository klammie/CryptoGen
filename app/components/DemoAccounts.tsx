"use client";
import React, { useEffect, useState } from "react";
import ToggleTrade from "./ToggleTrade";
import TradeDisplay from "../dashboard/trades/TradeDisplay";
import { Toaster } from "sonner";
import { ConfirmDelete } from "./ConfirmDelete";
import Image from "next/image";
import { Account } from "@/app/dashboard/trades/TradeSim";
import { getDemoAccount } from "../lib/getDemoAccount";
import { Loader2 } from "lucide-react";

const DemoAccount: React.FC = () => {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getDemoAccount();
        if (response.success && Array.isArray(response.demoAccount)) {
          setAccountData(
            response.demoAccount.map((account) => ({
              ...account,
              cryptoId: account.cryptoId ?? undefined,
            }))
          );
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

  const safeAccountData = accountData.map((account) => ({
    ...account,
    features: account.features ?? [],
  }));

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading demo accounts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {accountData.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No Demo Accounts</h3>
          <p className="text-gray-500">Add a demo account to practice trading risk-free.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {accountData.map((account) => (
            <div
              key={account.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 ring-1 ring-gray-200">
                  Demo
                </span>
                <div className="w-10 h-10 rounded-full bg-gray-50 p-1.5 flex items-center justify-center ring-1 ring-gray-100">
                  <Image
                    src={`/images/${account.image}.png`}
                    alt={account.type}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 mb-1">{account.type} Account</p>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
                  ${account.amount.toFixed(2)}
                </h3>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
                <div className="flex-1">
                  <ToggleTrade account={account} />
                </div>
                <ConfirmDelete
                  accountData={safeAccountData}
                  setAccountData={setAccountData}
                  accountId={account.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pt-4">
        <TradeDisplay />
      </div>
      
      <Toaster position="bottom-left" richColors />
    </div>
  );
};

export default DemoAccount;