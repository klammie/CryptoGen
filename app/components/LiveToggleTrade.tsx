"use client";

import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { toggleLiveAccount } from "@/app/lib/toggleLiveAccount";

interface Account {
  isActive: boolean;
  cryptoId?: string;
}

const LiveToggleButton: React.FC<{ account: Account }> = ({ account }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(account?.isActive ?? false);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    if (!account.cryptoId || loading) return;
    setLoading(true);
    try {
      const response = await toggleLiveAccount(account.cryptoId);
      if (response.success && response.isActive !== undefined) {
        setIsPlaying(response.isActive);
        toast.success(response.isActive ? "Trade initiated" : "Trades paused");
      } else {
        toast.error("Unable to initiate trade.");
      }
    } catch {
      toast.error("Unable to initiate trade.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      aria-pressed={isPlaying}
      title={isPlaying ? "Pause trading" : "Start trading"}
      className={`group flex h-10 w-full items-center justify-center gap-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 disabled:opacity-60 ${
        isPlaying
          ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100/70 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-indigo-500/40 dark:hover:text-indigo-300"
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Updating...
        </>
      ) : isPlaying ? (
        <>
          {/* ── Live trading equalizer (animated) ── */}
          <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="w-[3px] origin-bottom rounded-full bg-emerald-500 animate-[eq-bar_1.1s_ease-in-out_infinite] dark:bg-emerald-400"
                style={{ height: "100%", animationDelay: `${i * 150}ms` }}
              />
            ))}
          </span>
          Trading
          <span className="hidden text-[11px] font-medium text-emerald-600/70 group-hover:inline dark:text-emerald-300/60">
            · tap to pause
          </span>
        </>
      ) : (
        <>
          {/* ── Frozen bars (paused state) ── */}
          <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
            {["40%", "70%", "55%", "30%"].map((h, i) => (
              <span
                key={i}
                className="w-[3px] rounded-full bg-slate-300 transition-colors group-hover:bg-indigo-400 dark:bg-slate-600 dark:group-hover:bg-indigo-400"
                style={{ height: h }}
              />
            ))}
          </span>
          Paused
          <span className="hidden text-[11px] font-medium text-slate-400 group-hover:inline dark:text-slate-500">
            · tap to start
          </span>
        </>
      )}
    </button>
  );
};

export default LiveToggleButton;