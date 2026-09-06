"use client";
import React, { useEffect, useState } from "react";
import { getTradeLogs } from "@/app/lib/getTradeLogs";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";
import { getUserId } from "@/app/lib/getUserId";

interface TradeLog {
  crypto: string;
  result: number;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ color?: string; name?: string; value?: number | string }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-semibold text-gray-900 mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: <span className="font-medium">${Number(entry.value ?? 0).toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const InvestmentSummary = () => {
  const [data, setData] = useState<Array<{ name: string; loss: number; wins: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getUserId();
        const response = await getTradeLogs(userId);
        if (!response.success) {
          setError("Failed to load summary.");
          setLoading(false);
          return;
        }
        const transformedData = response.tradeLogs?.reduce(
          (acc: Array<{ name: string; loss: number; wins: number }>, trade: TradeLog) => {
            const { crypto, result } = trade;
            let entry = acc.find((item) => item.name === crypto);
            if (!entry) {
              entry = { name: crypto, loss: 0, wins: 0 };
              acc.push(entry);
            }
            if (result <= 0) {
              entry.loss += Math.abs(result);
            } else {
              entry.wins += result;
            }
            return acc;
          },
          []
        );
        setData(transformedData ?? []);
      } catch {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Investment Summary</h2>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7678ED]"></span>
            <span className="text-gray-600 font-medium">Wins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff7f51]"></span>
            <span className="text-gray-600 font-medium">Losses</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse w-full h-48 bg-gray-100 rounded-xl"></div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-center py-10">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center py-10">
            <div>
              <p className="text-gray-500 mb-1">No data available</p>
              <p className="text-sm text-gray-400">Start trading to see your summary.</p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorWins" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7678ED" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7678ED" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLoss" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff7f51" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ff7f51" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }} 
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
              <Area 
                type="monotone" 
                dataKey="wins" 
                stroke="#7678ED" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorWins)" 
              />
              <Area 
                type="monotone" 
                dataKey="loss" 
                stroke="#ff7f51" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorLoss)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default InvestmentSummary;