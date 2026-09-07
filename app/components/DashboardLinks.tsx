"use client";

import { cn } from "@/lib/utils";
import {
  ChartCandlestick,
  CircleHelp,
  LayoutDashboard,
  LucideProps,
  Store,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface iAppProps {
  id: number;
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const dashboardLinks: iAppProps[] = [
  {
    id: 0,
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 1,
    name: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    id: 2,
    name: "Trades",
    href: "/dashboard/trades",
    icon: ChartCandlestick,
  },
  {
    id: 3,
    name: "Shop",
    href: "/dashboard/shop",
    icon: Store,
  },
  {
    id: 4,
    name: "Help",
    href: "/dashboard/help",
    icon: CircleHelp,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1.5 px-3">
      {dashboardLinks.map((link) => {
        const Icon = link.icon;
        // Highlight on exact match AND nested routes (e.g. /dashboard/help/faq)
        const isActive =
          pathname === link.href || pathname?.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
              isActive
                ? "bg-indigo-50/80 font-semibold text-indigo-700"
                : "font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            {/* Purple active indicator bar (replaces the black pill) */}
            {isActive && (
              <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600" />
            )}
            <Icon
              className={cn(
                "h-[18px] w-[18px]",
                isActive ? "text-indigo-600" : "text-gray-500"
              )}
            />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}