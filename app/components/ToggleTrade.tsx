import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import {
  coreFunc,
  cryptoAcc,
  generateRandomInterval,
} from "../dashboard/trades/TradeSim";
import { toast } from "sonner";
import { toggleDemoAccount } from "@/app/lib/toggleDemoAccount";
import { getUserId } from "@/app/lib/getUserId";
import prisma from "../lib/db";

interface Account {
  id: string;
  type: string;
  amount: number;
  image: string;
  isActive: boolean; // ✅ Added isActive field
}

type TradeIntervalData = { intervalId: NodeJS.Timeout; interval: number };
const tradeIntervals = new Map<string, TradeIntervalData>();

const ToggleButton: React.FC<{ account: Account }> = ({ account }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(account.isActive);

  const startTrading = useCallback((account: Account) => {
    const matchedCryptoAcc = cryptoAcc.find((acc) => acc.id === account.id);
    if (!matchedCryptoAcc) return;

    const interval = generateRandomInterval(matchedCryptoAcc);
    const intervalId = setInterval(() => {
      coreFunc(matchedCryptoAcc);
      toast.success(`Trade Executed for ${matchedCryptoAcc.name}!`);
    }, interval);

    tradeIntervals.set(account.id, { intervalId, interval });
  }, []);

  const stopTrading = useCallback((account: Account) => {
    const tradeData = tradeIntervals.get(account.id);
    if (!tradeData) return;
    clearInterval(tradeData.intervalId);
    tradeIntervals.delete(account.id);
    toast.error(`Trading stopped!`);
  }, []);

  // ✅ Fetch account status from DB only if needed
  useEffect(() => {
    if (account.isActive !== undefined) return; // ✅ Skip fetch if `isActive` is already defined

    const fetchAccountStatus = async () => {
      const userId = await getUserId();
      if (!userId) return;

      const response = await prisma.demoAccount.findUnique({
        where: { id: userId },
        select: { isActive: true },
      });

      if (response) {
        setIsPlaying(response.isActive);
        if (response.isActive) startTrading(account);
      }
    };

    fetchAccountStatus();
  }, [account.id, startTrading]);

  // ✅ Toggle account status in DB with better state handling
  const handleToggle = async () => {
    const response = await toggleDemoAccount();

    if (!response.success || !response.updatedAccount) {
      toast.error("Failed to toggle account status.");
      return;
    }

    setIsPlaying((prev) => !prev); // ✅ Valid assignment
    if (response.updatedAccount.isActive) {
      startTrading(account); // ✅ Function call
    } else {
      stopTrading(account); // ✅ Function call
    }
  };

  return (
    <div className="mt-2">
      {isPlaying ? (
        <Pause onClick={handleToggle} />
      ) : (
        <Play onClick={handleToggle} />
      )}
    </div>
  );
};

export default ToggleButton;
