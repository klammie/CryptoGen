import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import { getUserId } from "@/app/lib/getUserId";
import { cryptoData } from "../trades/TradeSim";

interface TradeLog {
  id: string;
  crypto: string;
  matchedCrypto?: { id?: string; image: string; name: string };
  result: number;
}

const RecentActivity: React.FC = () => {
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTradeLogs = async () => {
      const userId = await getUserId();
      if (!userId) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await getTradeLogs(userId);
        if (response.success) {
          setTradeLogs(response.tradeLogs ?? []);
        } else {
          setError(typeof response.error === "string" ? response.error : "Failed to load activities.");
        }
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchTradeLogs();
  }, []);

  // Show most recent 5 trades first
  const recentTrades = tradeLogs.slice(-5).reverse(); 

  const formatTradeResult = (result: number): string => {
    const prefix = result >= 0 ? "+" : "";
    const formatted = Math.abs(result) >= 1000 
      ? Math.round(result).toLocaleString() 
      : Math.abs(result) >= 100 
      ? result.toFixed(1) 
      : result.toFixed(2);
    return `${prefix}${formatted}`;
  };

  const getImagepath = (cryptoName: string) => {
    if (!cryptoName) return "/crypto-images/bitcoin1.png";
    const matchedCrypto = cryptoData.find(
      (crypto) => crypto.name.toLowerCase() === cryptoName.toLowerCase()
    );
    return matchedCrypto ? matchedCrypto.image : "/crypto-images/bitcoin1.png";
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          Last 5
        </span>
      </div>
      <hr className="border-gray-100 mb-4" />

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {loading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center gap-3 p-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center text-center py-10">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : recentTrades.length === 0 ? (
          <div className="flex-1 flex items-center justify-center text-center py-10">
            <div>
              <p className="text-gray-500 mb-1">No recent activities</p>
              <p className="text-sm text-gray-400">Your trades will appear here.</p>
            </div>
          </div>
        ) : (
          recentTrades.map((trade, index) => {
            const isProfit = trade.result >= 0;
            return (
              <div
                key={trade.id || index}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm">
                    <Image
                      src={getImagepath(trade.crypto ?? "")}
                      alt={trade.crypto ?? "Crypto"}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{trade.crypto || "Unknown"}</p>
                    <p className="text-xs text-gray-500">Trade executed</p>
                  </div>
                </div>
                <div className={`text-sm font-semibold px-2.5 py-1 rounded-lg ${
                  isProfit 
                    ? "text-green-700 bg-green-50" 
                    : "text-red-700 bg-red-50"
                }`}>
                  {formatTradeResult(trade.result)}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RecentActivity;