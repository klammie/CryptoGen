import React, { useState } from "react";
import { Trade } from "./TradeSim"; // Adjust the import path as needed
import { Button } from "@/components/ui/button";
import { AllTrades } from "@/app/components/AllTrades";

const TradeDisplay: React.FC = () => {
  const tradeLogs = JSON.parse(
    localStorage.getItem("TradeLogs") || "[]"
  ) as Trade[];
  const [showAll, setShowAll] = useState(false);

  if (tradeLogs.length === 0) {
    return <p>Your Trades will appear here.</p>;
  }

  return (
    <div
      id="resultDisplay"
      className="row-span-3 xl:row-span-6 shadow-md rounded-2xl p-4 sm:p-6 lg:p-8"
    >
      <div className="flex flex-row justify-between">
        <h3 className="text-lg font-semibold px-4 pt-2 pb-4">
          Recent Activities
        </h3>
        <h4>
          <AllTrades />
        </h4>
      </div>
      <hr />
      <div className="overflow-auto h-full max-h-80">
        {(showAll ? tradeLogs : tradeLogs.slice(-4)).map((trade, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 lg:gap-10 px-4 py-4 border-b"
          >
            <div>
              <img
                src={`/assets/cryptoimages/${trade.matchedCrypto?.image}`}
                alt={trade.matchedCrypto?.name}
                className="w-8 h-8 rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-between gap-1">
              <div className="font-bold text-gray-700">
                {trade.matchedCrypto?.name}
              </div>
            </div>
            <div
              className="flex text-xl font-semibold items-center"
              style={{ color: trade.result < 1 ? "#ff7f51" : "#7678ED" }}
            >
              {trade.result}
            </div>
          </div>
        ))}
      </div>

      {tradeLogs.length > 5 && !showAll && (
        <div className="flex justify-center mt-4"></div>
      )}
    </div>
  );
};

export default TradeDisplay;
