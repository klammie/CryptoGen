import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getPnLStats } from "@/app/lib/getPnLStats"; // ✅ Import server action

const PnLStats = () => {
  const [pnlData, setPnLData] = useState([
    { name: "Profit", value: 0 },
    { name: "Loss", value: 0 },
  ]);

  const COLORS = ["#7678ED", "#ff7f51"]; // Colors for Profit and Loss

  // ✅ Fetch Profit/Loss Data from Database
  useEffect(() => {
    const fetchPnLData = async () => {
      try {
        const response = await getPnLStats(); // ✅ Fetch from DB

        if (response.success && response.data) {
          setPnLData([
            { name: "Profit", value: response.data.profit },
            { name: "Loss", value: response.data.loss },
          ]);
        } else {
          console.log("Error fetching PnL stats:", response.error);
        }
      } catch (error) {
        console.error("Database fetch error:", error);
      }
    };

    fetchPnLData();
  }, []);

  return (
    <div className="flex flex-col shadow-md rounded-2xl p-2 sm:p-6 lg:p-8 w-full h-full">
      <h2 className="text-xl font-semibold text-center">
        Profits and Loss Statistics
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pnlData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50} // ✅ Converts it into a Doughnut Chart
            fill="#8884d8"
          >
            {pnlData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PnLStats;
