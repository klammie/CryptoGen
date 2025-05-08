import React, { useState } from "react";
import { Play, Pause } from "lucide-react";
import { toast, Toaster } from "sonner";
import { toggleDemoAccount } from "@/app/lib/toggleDemoAccount";

interface Account {
  id: string;
  type: string;
  amount: number;
  image: string;
  isActive: boolean;
  cryptoId?: string;
}

const DemoToggleButton: React.FC<{ account: Account }> = ({ account }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(
    account?.isActive ?? false
  );

  const handleToggle = async () => {
    // ✅ Optimistically update the UI before waiting for the API response
    setIsPlaying((prev) => !prev);

    const response = await toggleDemoAccount();

    if (!response.success || !response.updatedAccount) {
      toast.error("Failed to toggle account status.");

      // ❌ If the API fails, revert the UI state back
      setIsPlaying((prev) => !prev);
      return;
    }

    // ✅ Ensure final state reflects the API response
    setIsPlaying(response.updatedAccount.isActive);
    toast.success(
      response.updatedAccount.isActive
        ? "Trade Initiated"
        : "Account is now Inactive"
    );
  };

  return (
    <div className="mt-2">
      {isPlaying ? (
        <Pause onClick={handleToggle} />
      ) : (
        <Play onClick={handleToggle} />
      )}
      <Toaster richColors position="bottom-left" />
    </div>
  );
};

export default DemoToggleButton;
