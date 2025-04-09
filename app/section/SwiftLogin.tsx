"use client";

import { useState, useRef, useEffect } from "react";
import { MoveRight, Zap, MenuIcon, X } from "lucide-react";
import Logo from "@/public/assets/logosaas.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const SwiftLogin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Reference to the menu

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 backdrop-blur-sm z-20">
      {/* Promo Banner */}
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
            <div className="flex items-center">
              <Image src={Logo} alt="Logo" height={60} width={60} />
              <p className="text-3xl text-black">
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
              <Button className="bg-black px-5">
                <a href="/dashboard">
                  <Zap className="text-white" />
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg py-4"
        >
          <nav className="flex flex-col items-center gap-4 text-black">
            <a href="/about">About</a>
            <a href="/features">Features</a>
            <a href="/affiliate">Affiliate</a>
            <a href="/contact">Contact</a>
            <Button className="bg-black px-5">
              <a href="/dashboard">
                <Zap className="text-white" />
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
