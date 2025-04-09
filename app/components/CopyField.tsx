"use client";
import React, { useRef, useState } from "react";

const CopyField: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<string>("");
  const textRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    if (textRef.current) {
      textRef.current.select();
      textRef.current.setSelectionRange(0, 99999); // For mobile devices
      navigator.clipboard.writeText(textRef.current.value).then(
        () => setCopySuccess("Copied!"),
        () => setCopySuccess("Failed to copy!")
      );
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        ref={textRef}
        type="text"
        value=""
        readOnly
        className="border border-gray-300 p-1 rounded bg-gray-500 cursor-default"
      />
      <button
        onClick={copyToClipboard}
        className="bg-blue-500 text-white p-1 rounded"
      >
        Copy Text
      </button>
      {copySuccess && <span>{copySuccess}</span>}
    </div>
  );
};

export default CopyField;
