"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MoveRight, MenuIcon, X } from "lucide-react";
import Logo from "@/public/qwenlogo.png";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "@/app/components/AuthModal";
import { MotionLink } from "@/app/components/ui/MotionLink";
import { EASE } from "@/app/components/ui/Reveal";
import { CryptoGenLogo } from "../components/ui/CryptoGenLogo";

const NAV_ITEMS = ["About", "Features", "Affiliate", "Contact"];

/** Hover underline for inactive links */
const hoverUnderline =
  "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-indigo-600 after:transition-transform after:duration-300 hover:after:scale-x-100";

export const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (item: string) =>
    pathname.startsWith(`/${item.toLowerCase()}`);

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="sticky top-0 z-50 w-full"
    >
      {/* Subtle Promo Banner */}
      <div className="w-full bg-slate-900 text-white text-xs py-2 text-center font-medium tracking-wide">
        <div className="container flex items-center justify-center gap-2">
          <span className="hidden md:inline text-slate-400">
            Maximize your profits with institutional-grade AI.
          </span>
          <Link
            href="/dashboard"
            className="group text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
          >
            Get started for free
            <MoveRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Main Navigation */}
      <div
        className={`border-b bg-white/80 backdrop-blur-lg transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 shadow-[0_8px_30px_rgba(2,6,23,0.06)]"
            : "border-slate-200/60"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
          <CryptoGenLogo size={32} withWordmark={false} />
          <span className="text-xl font-bold text-slate-900 tracking-tight">
            Crypto<span className="text-indigo-600">Gen</span>
          </span>
        </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase()}`}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-1 text-sm transition-colors ${
                      active
                        ? "text-slate-900 font-semibold"
                        : `text-slate-600 hover:text-slate-900 font-medium ${hoverUnderline}`
                    }`}
                  >
                    {item}

                    {/* Animated active indicator — slides between items */}
                    {active && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <AuthModal />
              <MotionLink
                href="/dashboard"
                className="gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
              >
                Open Dashboard
              </MotionLink>
            </div>

            {/* Mobile Toggle */}
            <motion.button
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col gap-1 py-6 px-6">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item);
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      href={`/${item.toLowerCase()}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-base transition-colors ${
                        active
                          ? "text-indigo-600 font-semibold bg-indigo-50/60"
                          : "text-slate-700 font-medium hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item}
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <hr className="border-slate-100 my-3" />
              <AuthModal />
              <MotionLink
                fullWidth
                href="/dashboard"
                className="px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-lg"
              >
                Open Dashboard
              </MotionLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};