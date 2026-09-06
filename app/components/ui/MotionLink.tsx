"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

interface MotionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Light sweep on hover */
  shine?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

/**
 * High-end button/link:
 * lifts on hover, compresses on tap, optional shine sweep,
 * arrow icons nudge via `group-hover`.
 */
export function MotionLink({
  href,
  children,
  className = "",
  shine = true,
  fullWidth = false,
  onClick,
}: MotionLinkProps) {
  return (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`group relative inline-flex ${fullWidth ? "w-full" : ""}`}
    >
      <Link
        href={href}
        onClick={onClick}
        className={`relative inline-flex items-center justify-center overflow-hidden ${
          fullWidth ? "w-full" : ""
        } ${className}`}
      >
        {shine && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[120%]"
          />
        )}
        {children}
      </Link>
    </motion.span>
  );
}