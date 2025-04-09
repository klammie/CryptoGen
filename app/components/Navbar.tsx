import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logosaas.png";
import { AuthModal } from "./AuthModal";
export function Navbar() {
  return (
    <div className="flex py-5 items-center justify-between">
      <Link href="/" className="flex items-center">
        <Image src={Logo} alt="Logo" className="size-14" />
        <h4 className="text-3xl font-semibold">
          Crypto<span className="text-primary">Gen</span>
        </h4>
      </Link>
      <AuthModal />
    </div>
  );
}

{
  /*Nav for HomePage*/
}
