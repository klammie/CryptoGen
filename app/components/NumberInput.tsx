"use client";
import React, { useState } from "react";

const NumberInput: React.FC = () => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setValue(inputValue);
  };

  return (
    <div>
      <label htmlFor="number-input">Please enter the amount manually</label>
      <input
        id="number-input"
        type="number"
        value={value}
        onChange={handleChange}
        min="0.02"
        step="0.01"
        placeholder="Minimum 0.02"
      />
    </div>
  );
};

export default NumberInput;
