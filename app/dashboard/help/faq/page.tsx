"use client";
import React from "react";
import Card from "@/app/components/Walletcards";

const Home: React.FC = () => {
  const cards = [
    {
      id: 1,
      title: "How do I get started with cryptocurrency trading?",
      content:
        "Choose between a Free demo account or add crypto to your wallet to purchase a Live account. Start trading with just a click—yes, its that simple!",
    },
    {
      id: 2,
      title: "Is Cryptocurrency trading risky?",
      content:
        "Yes, Cryptocurrency trading carries inherent risks due to the volatility of the market. Prices can fluctuate significantly, leading to potential losses. The great thing about our AI is it has been tested for years and has a consistent win rate of over 70%.",
    },
    {
      id: 3,
      title: "How to add funds to an account",
      content:
        "Navigate to the Wallet tab and click on Deposit. Choose your preferred crypto method from the dropdown menu, then copy the crypto address and paste it into your crypto wallet to complete the transfer.",
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
        "✨Yes! Cryptogen is fully regulated by the Securities and Exchange Commission (SEC) and the Financial Industry Regulatory Authority (FINRA) in the United States, as well as the European Securities and Markets Authority (ESMA) in Europe. As a trusted entity, we are proudly registered under our main company TokoCrypto, ensuring compliance, transparency, and security for all our users 🚀💎",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-5">Frequently Asked Questions</h1>

      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          content={card.content}
        />
      ))}
    </div>
  );
};

export default Home;
