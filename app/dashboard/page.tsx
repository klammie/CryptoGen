"use client";
import React from "react";
import DashboardAccountCard from "./dashcards/DashAccountCard";
import RecentActivity from "./dashcards/RecentActivitycard";
import InvestmentSummary from "./dashcards/InvestmentSummary";
import PnLStats from "./dashcards/PnLStats";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your trading overview.</p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <DashboardAccountCard />
          </div>
          
          <div className="xl:col-span-1">
            <PnLStats />
          </div>

          <div className="xl:col-span-2">
            <InvestmentSummary />
          </div>

          <div className="xl:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;