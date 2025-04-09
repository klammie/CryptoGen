"use client";
import React from "react";
import DashboardAccountCard from "./dashcards/DashAccountCard";
import RecentActivity from "./dashcards/RecentActivitycard";
import InvestmentSummary from "./dashcards/InvestmentSummary";
import PnLStats from "./dashcards/PnLStats";

const Dashboard = () => {
  return (
    <div className="mx-auto lg:ml-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 mx-auto">
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2 mt-5 xl:mt-0 mx-auto">
          <DashboardAccountCard />
        </div>

        <div className="col-span-1 lg:col-span-1 xl:mr-5 mx-auto">
          <PnLStats />
        </div>
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2">
          <InvestmentSummary />
        </div>
        <div className="col-span-1 xl:col-span-1 lg:col-span-1 xl:mr-5 mx-auto">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

