"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowDownToLine, CreditCard } from "lucide-react";

export function Deposit() {
  const [amount, setAmount] = useState(50);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function createPayment() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/payments/maxelpay/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const result = await response.json();
      if (!response.ok || typeof result.checkoutUrl !== "string") {
        throw new Error(result.error ?? "Unable to start payment");
      }
      window.location.assign(result.checkoutUrl);
    } catch (paymentError) {
      setError(paymentError instanceof Error ? paymentError.message : "Unable to start payment");
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl h-10 px-4 font-medium shadow-sm">
          <ArrowDownToLine className="w-4 h-4 mr-2" />
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Deposit Funds</DialogTitle>
          <DialogDescription>
            Complete your crypto payment securely through MaxelPay. Your balance is updated instantly after confirmation.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="deposit-amount" className="text-sm font-medium text-gray-700">
              Amount (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <Input
                id="deposit-amount"
                type="number"
                min={1}
                max={1000000}
                step={1}
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
                disabled={loading}
                className="pl-8 rounded-xl h-11"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button 
            className="w-full rounded-xl h-11 font-medium" 
            onClick={createPayment} 
            disabled={loading || amount < 1}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            {loading ? "Opening checkout..." : "Continue to Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}