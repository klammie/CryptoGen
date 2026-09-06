import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { getPnLStats } from "@/app/lib/getPnLStats";

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number | string }>;
}

const PnLStats = () => {
  const [pnlData, setPnLData] = useState([
    { name: "Profit", value: 0 },
    { name: "Loss", value: 0 },
  ]);
  const [loading, setLoading] = useState(true);
  const COLORS = ["#7678ED", "#ff7f51"];

  useEffect(() => {
    const fetchPnLData = async () => {
      try {
        const response = await getPnLStats();
        if (response.success && response.data) {
          setPnLData([
            { name: "Profit", value: response.data.profit },
            { name: "Loss", value: response.data.loss },
          ]);
        }
      } catch (error) {
        console.error("Database fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPnLData();
  }, []);

  const total = pnlData.reduce((sum, item) => sum + item.value, 0);
  const profitPercent = total > 0 ? ((pnlData[0].value / total) * 100).toFixed(1) : "0.0";

  const CustomTooltip = ({ active, payload }: ChartTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-100">
          <p className="text-xs font-medium text-gray-900">
            {payload[0].name}: <span className="font-bold">${Number(payload[0].value ?? 0).toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">P&L Statistics</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {loading ? (
          <div className="w-40 h-40 animate-pulse bg-gray-100 rounded-full"></div>
        ) : (
          <>
            <div className="relative w-full max-w-[200px] aspect-square">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pnlData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {pnlData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-2xl font-bold text-gray-900">{profitPercent}%</p>
                <p className="text-xs text-gray-500">Win Rate</p>
              </div>
            </div>

            {/* Custom Legend */}
            <div className="flex items-center justify-center gap-6 mt-6 w-full">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#7678ED]"></span>
                <div>
                  <p className="text-xs text-gray-500">Profit</p>
                  <p className="text-sm font-semibold text-gray-900">${pnlData[0].value.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff7f51]"></span>
                <div>
                  <p className="text-xs text-gray-500">Loss</p>
                  <p className="text-sm font-semibold text-gray-900">${pnlData[1].value.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PnLStats;