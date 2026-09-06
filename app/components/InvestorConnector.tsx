"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Unplug, Copy, Check } from "lucide-react";

const InvestorConnector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const credentials = [
    { label: "Login", value: "163596899" },
    { label: "Password", value: "s1eozec" },
    { label: "Investor", value: "7pwqbot" },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-xl border-gray-200 hover:bg-gray-50"
          title="View Investor Credentials"
        >
          <Unplug className="w-4 h-4 text-gray-600" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px] rounded-2xl p-6">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Unplug className="w-6 h-6 text-indigo-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-gray-900">
            Investor Credentials
          </DialogTitle>
          <DialogDescription className="mt-2 text-gray-500">
            Use these details to connect and view trades inside MetaTrader.
          </DialogDescription>
        </div>

        <div className="space-y-3">
          {credentials.map((cred) => (
            <div
              key={cred.label}
              className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl"
            >
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {cred.label}
                </p>
                <p className="text-sm font-mono font-semibold text-gray-900 mt-0.5">
                  {cred.value}
                </p>
              </div>
              <button
                onClick={() => handleCopy(cred.value, cred.label)}
                className="p-2 rounded-lg hover:bg-white transition-colors text-gray-400 hover:text-indigo-600"
                title={`Copy ${cred.label}`}
              >
                {copiedField === cred.label ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
          ))}
        </div>

        <Button
          onClick={() => setIsOpen(false)}
          className="w-full mt-6 rounded-xl h-11 font-medium bg-gray-900 hover:bg-gray-800"
        >
          Done
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default InvestorConnector;