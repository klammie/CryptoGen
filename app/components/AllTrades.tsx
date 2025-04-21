import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { getTradeLogs } from "@/app/lib/getTradeLogs"; // ✅ Import your API function
import { getUserId } from "../lib/getUserId";

interface TradeLog {
  matchedCrypto?: {
    image: string;
    name: string;
  };
  result: number;
}

export function AllTrades() {
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTradeLogs = async () => {
      const id = await getUserId(); // ✅ Correct way to handle async function

      if (!id) {
        setError("User ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await getTradeLogs(id);

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-2xl text-gray-600 border-none bg-transparent hover:text-gray-700">
          View All
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle className="text-lg font-semibold text-gray-800">
          All Trades
        </DialogTitle>
        <DialogHeader />

        {/* Trade Logs Display */}
        <div className="overflow-auto h-full max-h-80">
          {loading ? (
            <p className="text-gray-600 text-center">Loading trade logs...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : tradeLogs.length === 0 ? (
            <p className="text-gray-600 text-center">
              No trade logs available.
            </p>
          ) : (
            tradeLogs.map((trade, index) => (
              <div
                key={index}
                className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 lg:gap-10 px-4 py-4 border-b"
              >
                <Image
                  src={`/assets/cryptoimages/${trade.matchedCrypto?.image}`}
                  alt={trade.matchedCrypto?.name ?? "Unknown Crypto"}
                  width={32}
                  height={32}
                  className="rounded-lg shadow-md"
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
                  {trade.result}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
