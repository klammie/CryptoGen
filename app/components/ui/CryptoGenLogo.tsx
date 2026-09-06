"use client";

import { useId } from "react";

// ── App brand tokens (match the Tailwind classes used across the app) ────────
const INDIGO_600 = "#4f46e5"; // indigo-600
const PURPLE_600 = "#9333ea"; // purple-600
const SLATE_900 = "#0f172a"; // slate-900 (black)
const WHITE = "#ffffff";

interface CryptoGenLogoProps {
  /** Render the "CryptoGen" wordmark next to the mark */
  withWordmark?: boolean;
  /** Mark height in px */
  size?: number;
  /** "light" = on light backgrounds (black wordmark) · "dark" = on dark backgrounds (white wordmark) */
  variant?: "light" | "dark";
  className?: string;
}

export function CryptoGenLogo({
  withWordmark = true,
  size = 32,
  variant = "light",
  className = "",
}: CryptoGenLogoProps) {
  const id = useId();
  const gradId = `cg-grad-${id}`;
  const wordColor = variant === "light" ? SLATE_900 : WHITE;

  return (
    /* No background on purpose — fully transparent */
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* ── Mark: hexagon + ascending candlesticks ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="CryptoGen"
      >
        <defs>
          <linearGradient
            id={gradId}
            x1="14"
            y1="10"
            x2="84"
            y2="88"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={INDIGO_600} />
            <stop offset="1" stopColor={PURPLE_600} />
          </linearGradient>
        </defs>

        {/* Hexagon */}
        <path
          d="M48 9 L81.5 28.5 V67.5 L48 87 L14.5 67.5 V28.5 Z"
          stroke={`url(#${gradId})`}
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Wicks */}
        <g stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round">
          <path d="M30 45 V70" />
          <path d="M42 39 V64" />
          <path d="M54 31 V58" />
          <path d="M66 21 V50" />
        </g>

        {/* Candle bodies (uptrend) */}
        <g fill={`url(#${gradId})`}>
          <rect x="25.5" y="51" width="9" height="13" rx="2" />
          <rect x="37.5" y="45" width="9" height="13" rx="2" />
          <rect x="49.5" y="37" width="9" height="14" rx="2" />
          <rect x="61.5" y="27" width="9" height="16" rx="2" />
        </g>
      </svg>

      {/* ── Wordmark (HTML text so it stays font-crisp) ── */}
      {withWordmark && (
        <span
          style={{
            fontFamily: "'Inter', 'Be Vietnam Pro', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: Math.round(size * 0.56),
            letterSpacing: "-0.02em",
            color: wordColor,
            lineHeight: 1,
          }}
        >
          Crypto
          <span
            style={{
              background: `linear-gradient(135deg, ${INDIGO_600}, ${PURPLE_600})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Gen
          </span>
        </span>
      )}
    </span>
  );
}