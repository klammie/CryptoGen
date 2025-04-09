import React from "react";
import { Trade } from "@/app/dashboard/trades/TradeSim"; // Adjust the import path as needed

const RecentActivity: React.FC = () => {
  const tradeLogs = JSON.parse(
    localStorage.getItem("TradeLogs") || "[]"
  ) as Trade[];

  if (tradeLogs.length === 0) {
    return <p>Your Activities will appear here.</p>;
  }

  // Get the last 4 items
  const recentTrades = tradeLogs.slice(-4);
  const formatTradeResult = (result: number): string => {
    if (Math.abs(result) >= 1000) {
      return Math.round(result).toString(); // 4+ figures, remove decimal
    } else if (Math.abs(result) >= 100) {
      return result.toFixed(1); // 3 figures, keep 1 decimal
    } else {
      return result.toFixed(2); // 2 figures or less, keep 2 decimals
    }
  };
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
            {/* Correctly referencing images from `public/assets/cryptoimages/` */}
            <img
              src={`/assets/cryptoimages/${trade.matchedCrypto?.image}`}
              alt={trade.matchedCrypto?.name}
              className="w-8 h-8 rounded-lg shadow-md"
            />

            <div className="flex flex-col justify-between gap-1">
              <div className="font-bold text-gray-700">
                {trade.matchedCrypto?.name}
              </div>
            </div>

            <div
              className="flex text-xl font-semibold items-center"
              style={{ color: trade.result < 1 ? "#ff7f51" : "#7678ED" }} // Light Blue
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
