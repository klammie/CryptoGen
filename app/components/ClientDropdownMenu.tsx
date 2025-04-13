// components/ClientDropdownMenu.jsx

"use client"; // Ensure this is a client-side component

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ClientSignOutButton from "@/app/components/ClientSignOut";
import Image from "next/image";

interface ClientDropdownMenuProps {
  userImage: string;
}

export default function ClientDropdownMenu({
  userImage,
}: ClientDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <Image
            src={userImage}
            alt="pp"
            width={40} // Adjust based on your UI needs
            height={40}
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href="/dashboard">Settings</a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ClientSignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
