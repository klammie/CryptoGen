"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Account {
  id: string;
  type: string;
  amount: number;
  image: string;
}

const DashboardAccountCard: React.FC = () => {
  const [demoAccountData, setDemoAccountData] = useState<Account[]>([]);
  const [liveAccountData, setLiveAccountData] = useState<Account[]>([]);
  useEffect(() => {
    try {
      const storedDemoAccounts = localStorage.getItem("DemoAccount");
      const storedLiveAccounts = localStorage.getItem("LiveAccount");

      if (storedDemoAccounts) {
        setDemoAccountData(JSON.parse(storedDemoAccounts) || []);
      }
      if (storedLiveAccounts) {
        setLiveAccountData(JSON.parse(storedLiveAccounts) || []);
      }
    } catch (error) {
      console.error("Error parsing account data from localStorage:", error);
    }
  }, []);

  return (
    <div className="my-8 mx-auto xl:ml-20 justify-center">
      <h2 className="text-xl flex justify-center font-semibold mb-4">
        Accounts
      </h2>

      {demoAccountData.length === 0 && liveAccountData.length === 0 ? (
        <p className="text-gray-600">
          No account found. Please add an account from the shop.
        </p>
      ) : (
        <div className="flex flex-row gap-5">
          {liveAccountData.slice(0, 1).map((account) => (
            <div
              key={account.id}
              className="relative shadow-lg rounded-xl overflow-hidden bg-white"
            >
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded-full px-4 py-1 text-sm font-semibold bg-opacity-80 shadow-md">
                Live
              </div>
              <Image
                src={`/images/${account.image}.png`}
                alt={account.type}
                width={400} // Explicit width
                height={300} // Explicit height
                className="rounded"
              />
              <p className="absolute top-10 left-24 transform -translate-x-1/2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                ${account.amount.toFixed(2)}
              </p>
              <p className="absolute top-20 left-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-gray-100">
                {account.type}
              </p>
            </div>
          ))}
          {demoAccountData.slice(0, 2).map((account) => (
            <div
              key={account.id}
              className="relative shadow-lg rounded-xl overflow-hidden bg-white"
            >
              <div className="absolute top-1 left-1/2 transform bg-opacity-80 -translate-x-1/2 bg-gray-600 text-white rounded-full px-4 py-1 text-sm font-semibold shadow-md">
                Demo
              </div>
              <Image
                src={`/images/${account.image}.png`}
                alt={account.type}
                width={400} // Explicit width
                height={300} // Explicit height
                className="rounded"
              />
              <p className="absolute top-10 left-24 transform -translate-x-1/2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-md bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                ${account.amount.toFixed(2)}
              </p>
              <p className="absolute top-20 left-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-yellow-300 to-gray-100">
                {account.type}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAccountCard;
