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
    <>
      {dashboardLinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
          key={link.id}
          href={link.href}
        >
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
