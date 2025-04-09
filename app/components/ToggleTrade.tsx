import React, { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import {
  coreFunc,
  cryptoAcc,
  generateRandomInterval,
} from "../dashboard/trades/TradeSim";
import { toast } from "sonner";

const tradeIntervals = new Map<
  string,
  { intervalId: NodeJS.Timeout; interval: number }
>();

const startTrading = (account: any) => {
  const matchedCryptoAcc = cryptoAcc.find((acc) => acc.id === account.id);
  if (matchedCryptoAcc) {
    const interval = generateRandomInterval(matchedCryptoAcc);

    const intervalId = setInterval(() => {
      coreFunc(matchedCryptoAcc);
      toast.success(`Trade Executed for ${matchedCryptoAcc.name}!`);
    }, interval);

    tradeIntervals.set(account.id, { intervalId, interval });
  }
};

const stopTrading = (account: any) => {
  const tradeData = tradeIntervals.get(account.id);
  if (tradeData) {
    clearInterval(tradeData.intervalId);
    tradeIntervals.delete(account.id);
    toast.error(`Trading stopped !`);
  }
};

const ToggleButton = ({ account }) => {
  const [isPlaying, setIsPlaying] = useState(() => {
    return localStorage.getItem(`isPlaying-${account.id}`) === "true";
  });

  useEffect(() => {
    localStorage.setItem(`isPlaying-${account.id}`, isPlaying.toString());
    if (isPlaying) {
      startTrading(account); // Resume trading on mount if active
    } else {
      stopTrading(account);
    }
  }, [isPlaying, account]);

  const handleToggleClick = () => {
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <div className="mt-2">
      {isPlaying ? (
        <Pause onClick={handleToggleClick} />
      ) : (
        <Play onClick={handleToggleClick} />
      )}
    </div>
  );
};

export default ToggleButton;
