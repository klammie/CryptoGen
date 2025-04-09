import React, { useState } from 'react';

interface CardWithOptionsProps {
  id: number;
  title: string;
  options: string[];
}

const CardWithOptions: React.FC<CardWithOptionsProps> = ({ id, title, options }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div>
      <div className="card border rounded-lg p-6 m-4 shadow-md">
        <h2 className="text-xl font-semibold">Card {id}: {title}</h2>
        <div className="options mt-4">
          {options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-4 rounded m-2"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {selectedOption && (
        <div className="option-detail border rounded-lg p-6 m-4 shadow-md bg-gray-100">
          <h3 className="text-lg font-semibold">Selected Option:</h3>
          <p>{selectedOption}</p>
        </div>
      )}
    </div>
  );
};

export default CardWithOptions;
