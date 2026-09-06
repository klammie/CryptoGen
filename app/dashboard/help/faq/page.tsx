"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  id: number;
  title: string;
  content: string;
}

const faqData: FaqItem[] = [
  {
    id: 1,
    title: "How do I get started with cryptocurrency trading?",
    content:
      "Choose between a Free demo account or add crypto to your wallet to purchase a Live account. Start trading with just a click—yes, it's that simple!",
  },
  {
    id: 2,
    title: "Is Cryptocurrency trading risky?",
    content:
      "Yes, Cryptocurrency trading carries inherent risks due to the volatility of the market. Prices can fluctuate significantly, leading to potential losses. The great thing about our AI is it has been tested for years and has a consistent win rate of over 70%.",
  },
  {
    id: 3,
    title: "How to add funds to an account?",
    content:
      "Navigate to the Wallet tab and click on Deposit. Choose your preferred crypto method, then copy the crypto address and paste it into your crypto wallet to complete the transfer.",
  },
  {
    id: 4,
    title: "Why are the trading accounts so expensive?",
    content:
      "Our AI is designed to execute trades tailored to the account size and type. For instance, an aggressive account will execute more trades at higher risk levels. After conducting extensive tests over the years, we have determined that this is the minimum trading amount required to avoid complete account loss.",
  },
  {
    id: 5,
    title: "Is CryptoGen regulated?",
    content:
      "Yes! Cryptogen is fully regulated by the Securities and Exchange Commission (SEC) and the Financial Industry Regulatory Authority (FINRA) in the United States, as well as the European Securities and Markets Authority (ESMA) in Europe. We are proudly registered under our main company TokoCrypto, ensuring compliance, transparency, and security.",
  },
];

function FaqCard({ item }: { item: FaqItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-gray-50/50 transition-colors"
      >
        <h3 className="text-base md:text-lg font-semibold text-gray-900 pr-4">
          {item.title}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-indigo-600" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 md:px-6 pb-5 md:pb-6 text-gray-600 leading-relaxed">
            {item.content}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Everything you need to know about our platform and trading.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqData.map((item) => (
            <FaqCard key={item.id} item={item} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-500 mb-5">
            Can&apos;t find the answer you&apos;re looking for? Please chat with our friendly team.
          </p>
          <a
            href="/dashboard/help/support"
            className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}