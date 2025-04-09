"use server";

import prisma from "./db"; // Adjust the path based on your project structure
import { requireUser } from "../lib/hooks";

export const CashoutAction = async (formData: FormData) => {
  const session = await requireUser();
  const id = session?.user?.id;
  const valueToAdd = parseFloat(formData.get("valueToAdd") as string); // Retrieve the value

  if (!id || isNaN(valueToAdd)) {
    throw new Error("Invalid data provided");
  }

  try {
    const updatedAccount = await prisma.user.update({
      where: { id },
      data: {
        accBal: {
          increment: valueToAdd, // Add the value to accBal
        },
      },
    });
    console.log("Account balance updated successfully:", updatedAccount);

    return updatedAccount; // Optionally return the updated account
  } catch (error) {
    console.error("Error updating account balance:", error);
    throw new Error("Failed to update account balance");
  }
};
