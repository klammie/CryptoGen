// components/ClientSignOutButton.jsx

import { signOut } from "../lib/auth";

export default function ClientSignOutButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button className="w-full text-left">Log out</button>
    </form>
  );
}
