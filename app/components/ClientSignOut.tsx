// components/ClientSignOutButton.jsx

import { signOut } from "../lib/auth";
import { LogOut } from "lucide-react";

export default function ClientSignOutButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/" });
      }}
    >
      <button
        type="submit"
        className="flex w-full items-center text-left text-red-600 focus:text-red-600"
      >
        <LogOut className="mr-2 h-4 w-4" />
        Log out
      </button>
    </form>
  );
}
