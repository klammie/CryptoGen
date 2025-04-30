"use client";

import React, { useEffect, useState } from "react";
import { getTradeLogs } from "@/app/lib/getTradeLogs"; // ✅ Replace with getTradeLogs
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
  Legend,
} from "recharts";
import { getUserId } from "@/app/lib/getUserId";

interface TradeLog {
  crypto: string;
  result: number;
}

const InvestmentSummary = () => {
  const [data, setData] = useState<
    Array<{ name: string; loss: number; wins: number }>
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trade logs
        const userId = await getUserId(); // Fetch user ID
        const response = await getTradeLogs(userId); // ✅ Pass the user ID

        if (!response.success) {
          setError(
            typeof response.error === "string"
              ? response.error
              : JSON.stringify(response.error ?? "Unknown error")
          );
          setLoading(false);
          return;
        }

        // Transform trade logs into wins/losses
        const transformedData = response.tradeLogs?.reduce(
          (acc, trade: TradeLog) => {
            const { crypto, result } = trade;
            const isLoss = result <= 0;

            // Find existing entry or create a new one
            let entry = acc.find((item) => item.name === crypto);
            if (!entry) {
              entry = { name: crypto, loss: 0, wins: 0 };
              acc.push(entry);
            }

            // Categorize win/loss
            if (isLoss) {
              entry.loss += Math.abs(result); // Accumulate losses
            } else {
              entry.wins += result; // Accumulate wins
            }

            return acc;
          },
          [] as Array<{ name: string; loss: number; wins: number }>
        );

        setData(transformedData ?? []);
      } catch (err) {
        setError("An unexpected error occurred.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between shadow-md rounded-2xl p-4 sm:p-6 lg:p-8 w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Investment Summary
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading trade logs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500">No trade history available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="wins"
              fill="#7678ed"
              stroke="#7678ed"
            />
            <Area
              type="monotone"
              dataKey="loss"
              fill="#ff7f51"
              stroke="#ff7f51"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default InvestmentSummary;
