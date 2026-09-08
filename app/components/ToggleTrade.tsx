import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import { toast } from "sonner";
import { toggleDemoAccount } from "@/app/lib/toggleDemoAccount";

interface Account {
  isActive: boolean;
  cryptoId?: string;
}

const DemoToggleButton: React.FC<{ account: Account }> = ({ account }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(
    account?.isActive ?? false
  );

  const handleToggle = async () => {
    if (!account.cryptoId) {
      toast.error("Unable to initiate trade.");
      return;
    }

    try {
      const response = await toggleDemoAccount(account.cryptoId);
      if (response.success && response.isActive !== undefined) {
        setIsPlaying(response.isActive);
        toast.success(
          response.isActive ? "Trade Initiated" : "Trades Paused"
        );
      } else {
        toast.error("Unable to initiate trade.");
      }
    } catch {
      toast.error("Unable to initiate trade.");
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

export default DemoToggleButton;
