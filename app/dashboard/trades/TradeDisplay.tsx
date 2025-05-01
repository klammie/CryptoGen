"use client";
import React, { useEffect, useState } from "react";

import { AllTrades } from "@/app/components/AllTrades";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import { getUserId } from "@/app/lib/getUserId";
import { cryptoData } from "./TradeSim";

interface TradeLog {
  id: string;
  name: string; // ✅ Rename 'crypto' to 'name' based on actual data structure
  matchedCrypto?: {
    id?: number;
    image: string;
    name: string;
  };
  result: number;
  interval: number; // ✅ Include 'interval' from the response structure
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
          const formattedTradeLogs: TradeLog[] = response.tradeLogs.map(
            (trade) => ({
              id: trade.id,
              result: trade.result,
              userId: trade.userId,
              name: trade.crypto,
              matchedCrypto: {
                id: Number(trade.id), // ✅ Convert string ID to number
                name: trade.crypto,
                image: `/assets/cryptoimages/${trade.crypto}.png`,
              },
              interval: 0,
            })
          );
          setTradeLogs(formattedTradeLogs);
        } else {
          setTradeLogs([]);
          setError(response.error as string);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to retrieve trade logs.";
        console.error("Error fetching trade logs:", errorMessage);
        setError(errorMessage); // ✅ Ensures a string type is passed
      } finally {
        setLoading(false);
      }
    };

    fetchTradeLogs();
  }, []);

  if (loading) {
    return <p>Loading trade logs...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (tradeLogs.length === 0) {
    return <p>Your Trades will appear here.</p>;
  }

  const getImagepath = (cryptoName: string) => {
    if (!cryptoName.trim()) {
      console.log("Crypto name is missing, using fallback image.");
      return "/crypto-images/bitcoin1.png";
    }

    const cleanedName = cryptoName.trim().toLowerCase();

    const matchedCrypto = cryptoData.find(
      (crypto) => crypto.name.toLowerCase() === cleanedName
    );

    return matchedCrypto ? matchedCrypto.image : "/crypto-images/bitcoin1.png";
  };

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
              <Image
                src={getImagepath(
                  trade.matchedCrypto?.name ?? trade.name ?? ""
                )} // ✅ Use trade.crypto as fallback
                alt={
                  trade.matchedCrypto?.name ?? trade.name ?? "Unknown Crypto"
                } // ✅ Ensure alt text matches
                className="rounded-lg shadow-md"
                height={32}
                width={32}
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

      {tradeLogs.length > 5 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TradeDisplay;
