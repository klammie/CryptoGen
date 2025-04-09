"use server";
import { signIn } from "next-auth/react";

export async function handleSignIn() {
  return signIn("google"); // This must be executed on the client
}
