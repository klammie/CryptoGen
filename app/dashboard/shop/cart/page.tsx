"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Cart() {
  const [accountData, setAccountData] = useState<Array<any>>([]);

  useEffect(() => {
    // Check if localStorage has DemoAccount data
    const storedData = localStorage.getItem("LiveAccount");
    if (storedData) {
      // Parse the JSON string back to an array of objects
      const parsedData = JSON.parse(storedData);
      // Ensure parsedData is an array
      if (Array.isArray(parsedData)) {
        setAccountData(parsedData);
      }
    }
  }, []);

  if (accountData.length === 0) {
    return <p>Live Accounts will appear here</p>;
  }

  return (
    <div className="flex flex-col">
      <h1 className="flex justify-center text-2xl font-semibold mb-10">
        My Cart
      </h1>

      <div className="flex flex-col space-y-4 overflow-auto">
        {accountData.map((account) => (
          <div
            key={account.id}
            className="flex flex-row justify-between items-center gap-10 border p-2"
          >
            <div className="flex ">
              <img
                src={`/images/${account.image}.png`}
                alt={account.type}
                className="xl:w-1/4 md:w-1/4 w-1/2 h-auto rounded"
              />
            </div>
            <div className="font-semibold text-xl">{account.type}</div>
            <div className="font-semibold text-xl">Live</div>
            <div>{account.amount}</div>
          </div>
        ))}
      </div>
      <div className="my-5">
        <p>If you have a promotion code, please enter it here.</p>
        <input type="text" placeholder="Please enter promo code" />
        <Button>Apply Discount</Button>
      </div>
      <div className="border mt-10">
        <p>Discount</p>
        <p>Total</p>
      </div>

      <div className="">
        <Link href="/dashboard/shop">
          <Button className="mr-10 mt-5">Back to Shop</Button>
        </Link>
        <Button>Checkout</Button>
      </div>
    </div>
  );
}
// get the input value and save it inside the state to check if its == to the actual discount code
//if it is run func to deduct 20%
// checkout button should be adding data inside the db accounts field
