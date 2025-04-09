"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";

const CryptoSelector: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const textRef = useRef<HTMLInputElement>(null);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    let value = "";

    if (selectedOption === "Bitcoin") {
      value = "bc1qrls4z80572yy9vj2ujng24urpsunptw7nf6z5q";
    } else if (selectedOption === "Solana") {
      value = "5e1hF1WoaGqVFNdaiCbatDC3QPthBUmNTw7iEjezKFn9";
    } else if (selectedOption === "Lite Coin") {
      value = "ltc1q4uhm3uanqm2344v49qmj7wlql0m5zj6w9rq5mr";
    } else if (selectedOption === "Tether") {
      value = "0x75d1FD9E83F83011b64817cD733b282d2708d912";
    } else if (selectedOption === "Doge") {
      value = "DNL1iaUY4StNWVQMpc8buuT1q1YzF6515x";
    } else if (selectedOption === "Ethereum") {
      value = "0x75d1FD9E83F83011b64817cD733b282d2708d912";
    }

    setInputValue(value);
    setButtonDisabled(false); // Re-enable the button when selection changes
    setCopySuccess(""); // Reset copy success message
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const copyToClipboard = () => {
    if (textRef.current) {
      textRef.current.select();
      textRef.current.setSelectionRange(0, 99999); // For mobile devices
      navigator.clipboard.writeText(textRef.current.value).then(
        () => {
          setCopySuccess("Copied!");
          setButtonDisabled(true); // Disable the button
        },
        () => setCopySuccess("Failed to copy!")
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <label
        htmlFor="crypto-selector"
        className="block text-sm font-medium text-gray-700"
      >
        Select a Crypto deposit method:
      </label>
      <select
        id="crypto-selector"
        onChange={handleSelectChange}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">-- Select a method --</option>
        <option value="Solana">Solana</option>
        <option value="Bitcoin">Bitcoin(BTC)</option>
        <option value="Lite Coin">Lite Coin(LTC)</option>
        <option value="Tether">Tether(USDT)</option>
        <option value="Doge">Doge</option>
        <option value="Ethereum">Ethereum(ETH)</option>
      </select>
      <div className="flex items-center space-x-4 mt-4">
        <input
          ref={textRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="border border-gray-300 py-2 px-3 rounded bg-gray-500 cursor-default"
        />
        <Button
          onClick={copyToClipboard}
          disabled={buttonDisabled}
          className={`p-1 rounded ${
            buttonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
        >
          {copySuccess === "Copied!" ? "Copied" : "Copy Text"}
        </Button>
      </div>
    </div>
  );
};

export default CryptoSelector;
