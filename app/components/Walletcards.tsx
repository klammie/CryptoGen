import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CardProps {
  id?: number; // ✅ Add id if needed
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="card border rounded-lg p-6 m-4 shadow-md">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-xl font-semibold">{title}</h2>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isOpen && <p className="mt-4">{content}</p>}
    </div>
  );
};

export default Card;
