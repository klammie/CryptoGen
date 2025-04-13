import React, { useState, useEffect, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import {
  coreFunc,
  cryptoAcc,
  generateRandomInterval,
} from "../dashboard/trades/TradeSim";
import { toast } from "sonner";
import { useMemo } from "react";

interface Account {
  id: string;
  type: string;
  amount: number;
  image: string;
}

type TradeIntervalData = { intervalId: NodeJS.Timeout; interval: number };
const tradeIntervals = new Map<string, TradeIntervalData>();

// Helper function to safely access localStorage
const getLocalStorageItem = (key: string): string | null => {
  return typeof window !== "undefined" ? localStorage.getItem(key) : null;
};

const setLocalStorageItem = (key: string, value: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

const ToggleButton: React.FC<{ account: Account }> = ({ account }) => {
  const [isPlaying, setIsPlaying] = useState(
    () => getLocalStorageItem(`isPlaying-${account.id}`) === "true"
  );

  // ✅ Optimize by memoizing only `account.id`
  const memoizedAccountId = useMemo(() => account.id, [account.id]);

  // ✅ Memoize `startTrading` & `stopTrading` to prevent unnecessary function recreation
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
  //eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const storedPlaying = getLocalStorageItem(`isPlaying-${memoizedAccountId}`);
    if (storedPlaying === "true") {
      setIsPlaying(true);
      startTrading(account);
    }
  }, [memoizedAccountId, startTrading]); // ✅ Added `startTrading` to dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setLocalStorageItem(`isPlaying-${memoizedAccountId}`, isPlaying.toString());

    if (isPlaying) {
      startTrading(account);
    } else {
      stopTrading(account);
    }
  }, [isPlaying, memoizedAccountId, startTrading, stopTrading]); // ✅ Added both functions

  return (
    <div className="mt-2">
      {isPlaying ? (
        <Pause onClick={() => setIsPlaying(false)} />
      ) : (
        <Play onClick={() => setIsPlaying(true)} />
      )}
    </div>
  );
};

export default ToggleButton;
