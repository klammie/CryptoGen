import React from "react";

const NumberInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor="number-input"
        className="block text-sm font-medium text-gray-700"
      >
        Please enter the amount:
      </label>
      <input
        id="number-input"
        type="number"
        value={value}
        onChange={handleChange}
        min="0"
        step="1"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      />
    </div>
  );
};

export default NumberInput;
