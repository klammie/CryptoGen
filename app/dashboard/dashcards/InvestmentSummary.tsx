"use client";

import React, { useEffect, useState } from "react";
import { getInvestmentSummary } from "@/app/lib/getInvestmentSummary";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInvestmentSummary();

      if (!response.success) {
        setError(response.error ?? null);
        setLoading(false);
        return;
      }

      setData(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between shadow-md rounded-2xl p-4 sm:p-6 lg:p-8 w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Investment Summary
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading investment data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : data.length === 0 ? (
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
