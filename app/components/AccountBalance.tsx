"use client";

import React, { useEffect, useState } from "react";

type BalancesProps = {
  userId: string;
};
{
  /*replace local storage with the fetched data from the db*/
}
const Balances: React.FC<BalancesProps> = ({ userId }) => {
  const [userData, setUserData] = useState<{
    userName: string;
    accBal: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/getUserData?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <div>
      <h2>User Name: {userData.userName}</h2>
      <p>Account Balance: {userData.accBal}</p>
    </div>
  );
};

export default Balances;
