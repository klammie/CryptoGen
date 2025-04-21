"use server";
import { auth } from "./auth"; // Adjust path if needed

export async function getUserId() {
  const session = await auth(); // Fetch session securely

  if (!session?.user?.id) {
    throw new Error("User not authenticated");
  }

  return session.user.id; // ✅ Return only the user ID
}