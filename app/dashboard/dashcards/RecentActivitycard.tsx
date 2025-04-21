import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs"; // ✅ Import your database function
import { getUserId } from "@/app/lib/getUserId"; // ✅ Ensure correct user ID retrieval

interface TradeLog {
  id: string;
  matchedCrypto?: {
    id?: string;
    image: string;
    name: string;
  };
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
          setError(
            typeof response.error === "string"
              ? response.error
              : JSON.stringify(response.error)
          );
        }
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTradeLogs();
  }, []);

  if (loading) {
    return <p className="flex items-center">Loading recent activities...</p>;
  }

  if (error) {
    return <p className="text-red-600 flex items-center">{error}</p>;
  }

  if (tradeLogs.length === 0) {
    return (
      <p className="flex items-center">Your Activities will appear here.</p>
    );
  }

  const recentTrades = tradeLogs.slice(-4);
  const formatTradeResult = (result: number): string =>
    Math.abs(result) >= 1000
      ? Math.round(result).toString()
      : Math.abs(result) >= 100
      ? result.toFixed(1)
      : result.toFixed(2);

  return (
    <div
      id="resultDisplay"
      className="row-span-3 xl:row-span-6 shadow-md rounded-2xl p-4 sm:p-6 lg:p-8"
    >
      <h3 className="text-lg font-semibold px-4 pt-2 pb-2">
        Recent Activities
      </h3>
      <hr />
      <div className="overflow-auto h-full">
        {recentTrades.map((trade, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 lg:gap-10 px-4 py-4 border-b"
          >
            <Image
              src={`/assets/cryptoimages/${trade.matchedCrypto?.image}`}
              alt={trade.matchedCrypto?.name ?? "Unknown Crypto"} // ✅ Default value ensures a string
              className="rounded-lg shadow-md"
              height={32}
              width={32}
            />
            <div className="flex flex-col justify-between gap-1">
              <div className="font-bold text-gray-700">
                {trade.matchedCrypto?.name}
              </div>
            </div>
            <div
              className="flex text-xl font-semibold items-center"
              style={{ color: trade.result < 1 ? "#ff7f51" : "#7678ED" }}
            >
              {formatTradeResult(trade.result)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
