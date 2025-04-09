import logo from "@/public/assets/logosaas.png";
import { Twitter, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute">
          <Image src={logo} alt="logo" height={40} className="relative" />
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="/about">About</a>
          <a href="/features">Features</a>
          <a href="/affiliate">Affiliate</a>
          <a href="/contact">Contact</a>
          <a href="/legal">Legal</a>
        </nav>
        <div className="flex justify-center md:flex-row md:justify-center gap-6 mt-6">
          <Twitter />
          <Instagram />
          <Youtube />
          <Linkedin />
        </div>
        <p className="mt-6">&copy; 2025 CryptoGen Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
