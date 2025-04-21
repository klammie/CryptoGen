"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { getLiveAccount } from "@/app/lib/getLiveAccount"; // ✅ Import DB function

const AccountSelector: React.FC<{
  onAccountSelect: (amount: number) => void;
}> = ({ onAccountSelect }) => {
  const [selectedAccountId, setSelectedAccountId] = useState<string>("");
  const [accounts, setAccounts] = useState<
    Array<{ id: string; type: string; amount: number }>
  >([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getLiveAccount(); // ✅ Fetch from DB
        console.log("Fetched accounts:", response);

        if (response.success && Array.isArray(response.liveAccount)) {
          setAccounts(response.liveAccount); // ✅ Extracts array
          const total = response.liveAccount.reduce(
            (sum, acc) => sum + acc.amount,
            0
          );
          setTotalAmount(total);
        } else {
          setAccounts([]);
        }
      } catch (err) {
        console.error("Error fetching demo accounts:", err);
        setError("Failed to fetch account data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccountId(event.target.value);
  };

  const handleAccountSelection = () => {
    const selectedAccount = accounts.find(
      (acc) => acc.id === selectedAccountId
    );
    if (!selectedAccount) {
      toast.error("Account not found");
      return;
    }

    // ✅ Increment balance using selected account amount
    onAccountSelect(selectedAccount.amount);

    // ✅ Remove the selected account from state (No localStorage)
    const updatedAccounts = accounts.filter(
      (acc) => acc.id !== selectedAccountId
    );
    setAccounts(updatedAccounts);
    setTotalAmount(updatedAccounts.reduce((sum, acc) => sum + acc.amount, 0));
    setSelectedAccountId(""); // Reset selection
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">From</h3>

      {loading ? (
        <p className="text-center text-lg font-semibold text-gray-600 mt-10">
          Loading accounts...
        </p>
      ) : error ? (
        <p className="text-center text-lg font-semibold text-red-600 mt-10">
          {error}
        </p>
      ) : (
        <>
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            Total: ${totalAmount.toFixed(2)}
          </h2>

          <label
            htmlFor="account-dropdown"
            className="block text-sm font-medium text-gray-700"
          >
            Select an account:
          </label>

          <select
            id="account-dropdown"
            value={selectedAccountId}
            onChange={handleSelectChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="" disabled>
              -- Select an account --
            </option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.type} (${account.amount.toFixed(2)})
              </option>
            ))}
          </select>

          <Button
            onClick={handleAccountSelection}
            className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Confirm
          </Button>
        </>
      )}
    </div>
  );
};

export default AccountSelector;
