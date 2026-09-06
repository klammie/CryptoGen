import { Cashout } from "@/app/components/Cashout";
import { Deposit } from "@/app/components/Deposit";
import Withdrawl from "@/app/components/Withdrawl";
import { getData } from "@/app/lib/getData";
import { requireUser } from "@/app/lib/hooks";
import { Key, TrendingUp, Shield } from "lucide-react";

export default async function Walletroute() {
  const session = await requireUser();
  const data = await getData(session?.user?.id as string);

  const balance = data?.accBal ?? 0;
  const freeMargin = (balance * 1.2).toFixed(2);
  const keys = data?.keyz ?? 0;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Wallet</h1>
          <p className="text-gray-500 mt-1">Manage your funds and trading accounts.</p>
        </div>

        {/* Main Balance & Actions Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Total Balance</p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
               <Deposit />
               <Withdrawl />
               <Cashout />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
           {/* Free Margin */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                 </div>
                 <p className="text-sm font-medium text-gray-500">Free Margin</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">${freeMargin}</p>
           </div>

           {/* Access Keys */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <Key className="w-5 h-5" />
                 </div>
                 <p className="text-sm font-medium text-gray-500">Access Keys</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{keys}</p>
           </div>

           {/* Leverage */}
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <Shield className="w-5 h-5" />
                 </div>
                 <p className="text-sm font-medium text-gray-500">Leverage</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">1:1000</p>
           </div>
        </div>
      </div>
    </div>
  );
}