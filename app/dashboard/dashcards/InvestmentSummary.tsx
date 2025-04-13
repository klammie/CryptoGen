"use client";

import React, { useEffect, useState } from "react";
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

const InvestmentSummary = () => {
  const [data, setData] = useState<
    Array<{ name: string; loss: number; wins: number }>
  >([]);

  useEffect(() => {
    try {
      const storedTradeLogs = localStorage.getItem("TradeLogs"); // Match the correct capitalization

      if (storedTradeLogs) {
        const parsedLogs = JSON.parse(storedTradeLogs) || [];

        // Get the last 100 trade logs directly
        const latestLogs = parsedLogs.slice(-20);
        interface TradeLog {
          matchedCrypto?: {
            name?: string;
          };
          result: number;
        }
        // Transform data into expected format: name, wins, loss
        const formattedData = latestLogs.map((trade: TradeLog) => ({
          name: trade.matchedCrypto?.name || "Unknown",
          wins: trade.result >= 1 ? trade.result : 0,
          loss: trade.result < 1 ? Math.abs(trade.result) : 0,
        }));

        setData(formattedData);
      } else {
        console.warn("No TradeLogs found in localStorage");
        setData([]);
      }
    } catch (error) {
      console.error("Error parsing TradeLogs from localStorage:", error);
      setData([]);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between shadow-md rounded-2xl p-4 sm:p-6 lg:p-8 w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Investment Summary
      </h2>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">
          No investment data available.
        </p>
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
