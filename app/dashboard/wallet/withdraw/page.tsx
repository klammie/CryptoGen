"use client";
import AccountSelector from "@/app/components/AccountSelector";
import AmountInput from "@/app/components/AmountInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleGoBackClick = () => {
    setSelectedOption(null);
  };

  const renderContentBasedOnSelection = () => {
    if (selectedOption) {
      return (
        <div className="flex items-center justify-center mx-auto">
          <h2 className="text-xl font-semibold">
            You Selected: {selectedOption}
          </h2>
          <p>Here are some details about {selectedOption}...</p>
          <h2>Withdraw to </h2>
          <AccountSelector />
          <AmountInput />
          <button
            className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            onClick={handleGoBackClick}
          >
            Choose another method
          </button>
          <Button className="ml-10">Proceed</Button>
        </div>
      );
    }

    return (
      <div className="options mt-4">
        {[
          "Bitcoin",
          "Ethereum(ERC20)",
          "Tether(TRC20)",
          "Tether(ERC20",
          "Dogecoin",
          "Litecoin",
        ].map((option, index) => (
          <button
            key={index}
            className="bg-purple-500 text-white py-2 px-4 rounded m-2"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* Div with Options and Dynamic Content */}
      <div className="option-div border rounded-lg p-6 m-4 shadow-md">
        <p className="font-semibold">
          Please note: To keep your money safe, we encourage you to withdraw via
          the same method you used for depositing funds. If you can't use this
          method anymore, contact our Customer Support. Withdrawal usually takes
          1-3 hours but sometimes may take up to 3 business days
        </p>
        <h1 className="text-xl font-semibold">Select a payment method</h1>
        <div className="content mt-4">{renderContentBasedOnSelection()}</div>
      </div>
    </div>
  );
};

export default Home;
