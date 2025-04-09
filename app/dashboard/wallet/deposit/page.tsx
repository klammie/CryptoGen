"use client";
import CopyField from "@/app/components/CopyField";
import NumberInput from "@/app/components/NumberInput";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isMoreContentVisible, setIsMoreContentVisible] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsMoreContentVisible(false); // Reset the third div visibility when a new option is selected
  };

  const handleMoreContentClick = () => {
    setIsMoreContentVisible(true);
  };

  const renderSecondDivContent = () => {
    if (selectedOption === "Bitcoin") {
      return (
        <div>
          <div>
            <h2>Proceed to deposit via Bitcoin?</h2>
            <h3>Important to know</h3>
            <p>
              We only accept Bitcoin(BTC).Bitcoin(BTC) as a stand-alone payment
              instrument and is not associated with Bitcoin Cash or any other
              cryptocurrency fork.
            </p>
            <p>
              The total of all your Bitcoin deposits cannot exceed $20000.00 a
              day.
            </p>
          </div>
          {/*<div>
            <Button>CHOOSE ANOTHER METHOD</Button>
            <Button>PROCEED WITH BITCOIN</Button>
          </div>*/}
        </div>
      );
    } else if (selectedOption === "Ethereum(ERC20)") {
      return (
        <div>
          <h1>Specifiy the deposit amount</h1>
          <NumberInput />
        </div>
      );
    }
    return (
      <div>
        <h2>Important to know </h2>
        <p>
          Ensure that the selected cryptocurrency matches the address you are
          using for the deposit. For example you can only send ERC20 tokens to
          our ERC20 address. If you send them to a different address you will
          lose your funds
        </p>
        <p>
          Carefully check the address. The transaction will be lost if the
          address is incorrect.
        </p>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      {/* First Div: Always Visible */}
      <div className="first-div border rounded-lg p-6 m-4 shadow-md">
        <h1 className="text-xl font-semibold">
          New deposit for account 23338912
        </h1>
        <div className="options mt-4">
          {["Bitcoin", "Ethereum", "Tether(ERC20)", "Dogecoin", "Litecoin"].map(
            (option, index) => (
              <button
                key={index}
                className="bg-blue-300 text-white py-2 px-4 rounded m-2"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>

      {/* Second Div: Visible Based on Selected Option */}
      {selectedOption && (
        <div className="second-div border rounded-lg p-6 m-4 shadow-md bg-gray-600">
          <h2 className="text-xl font-semibold">
            Proceed to depositing via {selectedOption}?
          </h2>
          {renderSecondDivContent()}
          <button
            className="bg-blue-500 text-blue py-2 px-4 rounded mt-4"
            onClick={handleMoreContentClick}
          >
            Proceed with {selectedOption}
          </button>
        </div>
      )}

      {/* Third Div: Visible After Clicking the Button */}
      {isMoreContentVisible && (
        <div className="third-div border rounded-lg p-6 m-4 shadow-md bg-blue-300">
          <h2 className="text-xl font-semibold">
            Proceed to deposit via {selectedOption}?
          </h2>
          <h3>How it works</h3>
          <p>
            Copy the {selectedOption} address below into your crypto wallet app.
            If you deposit through our site you can scan the QR code with your
            smartphone instead.
          </p>
          <CopyField />
          <p>Specify the deposit amount right in the wallet app</p>
        </div>
      )}
    </div>
  );
};

export default Home;
