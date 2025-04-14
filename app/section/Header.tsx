"use client";

import { useState } from "react";
import { MoveRight, MenuIcon, X } from "lucide-react";
import Logo from "@/public/assets/logosaas.png";
import Image from "next/image";
import AuthModal from "@/app/components/AuthModal";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      {/* Promo bar */}
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-3">
        <div className="inline-flex gap-1 items-center">
          <p className="text-white/60 hidden md:block">
            Maximize your profits and boost your productivity
          </p>
          <p className="ml-0.5">Get started for free</p>
          <MoveRight className="h-4 w-4 mt-0.5" />
        </div>
      </div>

      {/* Header Content */}
      <div className="py-3">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <div className="flex gap-2 items-center">
              <Image src={Logo} alt="Logo" height={60} width={60} />
              <p className="text-3xl font-semibold text-black">
                <span className="text-primary font-bold"> Crypto</span>Gen
              </p>
            </div>

            {/* Hamburger Icon for Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-black focus:outline-none"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-6 text-black/60 items-center">
              <a href="/about">About</a>
              <a href="/features">Features</a>
              <a href="/affiliate">Affiliate</a>
              <a href="/contact">Contact</a>
              <AuthModal />
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-2 right-4 text-black focus:outline-none"
          >
            <X className="h-6 w-6" /> {/* Close icon */}
          </button>

          <nav className="flex flex-col items-center gap-4 text-black mt-8">
            <a href="/about">About</a>
            <a href="/features">Features</a>
            <a href="/affiliate">Affiliate</a>
            <a href="/contact">Contact</a>
            <AuthModal />
          </nav>
        </div>
      )}
    </header>
  );
};
