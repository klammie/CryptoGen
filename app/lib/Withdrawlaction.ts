"use server";

import prisma from "./db"; // Adjust the path based on your project structure
import { requireUser } from "../lib/hooks";

export const WithdrawlAction = async (formData: FormData) => {
  const session = await requireUser();
  const id = session?.user?.id;
  const valueToWithdraw = parseFloat(formData.get("valueToWithdraw") as string); // Retrieve the withdrawal amount

  if (!id || isNaN(valueToWithdraw) || valueToWithdraw <= 0) {
    throw new Error("Invalid withdrawal amount provided");
  }

  try {
    const userAccount = await prisma.user.findUnique({
      where: { id },
      select: { accBal: true },
    });

    if (!userAccount || userAccount.accBal < valueToWithdraw) {
      throw new Error("Insufficient balance");
    }

    const updatedAccount = await prisma.user.update({
      where: { id },
      data: {
        accBal: {
          decrement: valueToWithdraw, // Deduct the value from accBal
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