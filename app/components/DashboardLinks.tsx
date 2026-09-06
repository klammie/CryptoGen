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
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.id}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-gray-900 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
          >
            <Icon className={cn("h-4.5 w-4.5", isActive ? "text-white" : "text-gray-500")} />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}