import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PnLStats = () => {
  // State for dynamic data
  const [pnlData, setPnLData] = useState([
    { name: "Profit", value: 0 },
    { name: "Loss", value: 0 },
  ]);

  const COLORS = ["#7678ED", "#ff7f51"]; // Colors for Profit and Loss

  // Fetch data from localStorage
  useEffect(() => {
    const storedProfits = localStorage.getItem("profits");
    const storedLosses = localStorage.getItem("losses");

    const profits = storedProfits ? parseInt(storedProfits, 10) : 0;
    const losses = storedLosses ? parseInt(storedLosses, 10) : 0;

    setPnLData([
      { name: "Profit", value: profits },
      { name: "Loss", value: losses },
    ]);
  }, []);

  return (
    <div className="flex flex-col shadow-md rounded-2xl p-2 sm:p-6 lg:p-8 w-full h-full">
      <h2 className="text-xl font-semibold  text-center">
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
