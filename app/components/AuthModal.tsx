"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Logo from "@/public/assets/logosaas.png";
import Image from "next/image";
import { GoogleAuthButton } from "./SubmitButtons";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function AuthModal() {
  const [loading, setLoading] = useState(false);

  async function handleSignIn() {
    setLoading(true);
    await signIn("google");
    setLoading(false);
  }

  return (
    <Dialog>
      {/* Login Trigger Button */}
      {/* Login Trigger Button */}
      <DialogTrigger asChild>
        <Button className="bg-black text-white" disabled={loading}>
          {loading ? "Signing in..." : "Try for Free"}
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-[360px]">
        <DialogTitle></DialogTitle>
        {/* Logo Image */}
        <DialogHeader className="flex items-center justify-center flex-row gap-2">
          <Image src={Logo} alt="Logo" className="size-10" />
          <h4 className="text-3xl font-bold">
            Crypto<span className="font-semibold text-primary">Gen</span>
          </h4>
        </DialogHeader>
        {/* Logo Text */}
        <div className="flex flex-col mt-5">
          <form className="w-full" action={handleSignIn}>
            <GoogleAuthButton />
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
