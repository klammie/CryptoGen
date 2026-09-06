"use client";
import React, { useState } from "react";
import DemoAccount from "@/app/components/DemoAccounts";
import LiveAccount from "@/app/components/LiveAccount";

function Page() {
  const [activeTab, setActiveTab] = useState<"live" | "demo">("live");

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Trading Accounts</h1>
          <p className="text-gray-500 mt-1">Manage your live and demo trading environments.</p>
        </div>

        {/* Segmented Tab Control */}
        <div className="mb-8">
          <div className="inline-flex p-1 bg-gray-100 rounded-xl">
            <button
              onClick={() => setActiveTab("live")}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === "live"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Live Accounts
            </button>
            <button
              onClick={() => setActiveTab("demo")}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                activeTab === "demo"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Demo Accounts
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-in fade-in duration-300">
          {activeTab === "live" ? <LiveAccount /> : <DemoAccount />}
        </div>
      </div>
    </div>
  );
}

export default Page;