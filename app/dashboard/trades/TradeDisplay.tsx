"use client";
import React, { useEffect, useState } from "react";
import { AllTrades } from "@/app/components/AllTrades";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import { getUserId } from "@/app/lib/getUserId";
import { cryptoData } from "./TradeSim";
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";

interface TradeLog {
  id: string;
  name: string;
  matchedCrypto?: {
    id?: number;
    image: string;
    name: string;
  };
  result: number;
  interval: number;
}

const TradeDisplay: React.FC = () => {
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTradeLogs = async () => {
      try {
        const userId = await getUserId();
        if (!userId) {
          setError("User authentication failed.");
          setLoading(false);
          return;
        }

        const response = await getTradeLogs(userId);
        if (response.success && response.tradeLogs) {
          const formattedTradeLogs: TradeLog[] = response.tradeLogs.map((trade) => ({
            id: trade.id,
            result: trade.result,
            userId: trade.userId,
            name: trade.crypto,
            matchedCrypto: {
              id: Number(trade.id),
              name: trade.crypto,
              image: `/assets/cryptoimages/${trade.crypto}.png`,
            },
            interval: 0,
          }));
          setTradeLogs(formattedTradeLogs);
        } else {
          setTradeLogs([]);
          setError(response.error as string);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to retrieve trade logs.";
        console.error("Error fetching trade logs:", errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchTradeLogs();
  }, []);

  const getImagepath = (cryptoName: string) => {
    if (!cryptoName?.trim()) return "/crypto-images/bitcoin1.png";
    const cleanedName = cryptoName.trim().toLowerCase();
    const matchedCrypto = cryptoData.find(
      (crypto) => crypto.name.toLowerCase() === cleanedName
    );
    return matchedCrypto ? matchedCrypto.image : "/crypto-images/bitcoin1.png";
  };

  const formatTradeResult = (result: number): string => {
    const prefix = result >= 0 ? "+" : "";
    const formatted = Math.abs(result) >= 1000 
      ? Math.round(result).toLocaleString() 
      : Math.abs(result) >= 100 
      ? result.toFixed(1) 
      : result.toFixed(2);
    return `${prefix}${formatted}`;
  };

  const displayedTrades = showAll ? tradeLogs : tradeLogs.slice(-5);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Trade History</h2>
        <AllTrades />
      </div>
      <hr className="border-gray-100 mb-4" />

      {/* Content */}
      <div className="space-y-2">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mb-3" />
            <p className="text-sm text-gray-500">Loading trades...</p>
          </div>
        ) : error ? (
          <div className="py-10 text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : tradeLogs.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">Your trades will appear here.</p>
          </div>
        ) : (
          <>
            {displayedTrades.map((trade, index) => {
              const isProfit = trade.result >= 0;
              return (
                <div
                  key={trade.id || index}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden ring-2 ring-white shadow-sm">
                      <Image
                        src={getImagepath(trade.matchedCrypto?.name ?? trade.name ?? "")}
                        alt={trade.matchedCrypto?.name ?? trade.name ?? "Crypto"}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {trade.matchedCrypto?.name || trade.name || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500">Trade executed</p>
                    </div>
                  </div>
                  
                  <div
                    className={`text-sm font-semibold px-2.5 py-1 rounded-lg ${
                      isProfit ? "text-green-700 bg-green-50" : "text-red-700 bg-red-50"
                    }`}
                  >
                    {formatTradeResult(trade.result)}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Show More/Less Toggle */}
      {tradeLogs.length > 5 && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show All ({tradeLogs.length}) <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeDisplay;