"use client";

import React, { useState } from "react";
import DemoAccount from "@/app/components/DemoAccounts";
import LiveAccount from "@/app/components/LiveAccount";
import { Button } from "@/components/ui/button";

function Page() {
  const [activeTab, setActiveTab] = useState("live"); // Default to live accounts

  return (
    <div className="mx-auto text-center">
      {/* Tab buttons */}
      <div className="flex justify-start mb-4">
        <Button
          className={`px-4 py-2 mr-2 ${
            activeTab === "live" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("live")}
        >
          Live Accounts
        </Button>
        <Button
          className={`px-4 py-2 ${
            activeTab === "demo" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setActiveTab("demo")}
        >
          Demo Accounts
        </Button>
      </div>

      {/* Conditionally render accounts */}
      {activeTab === "live" ? <LiveAccount /> : <DemoAccount />}
    </div>
  );
}

export default Page;
