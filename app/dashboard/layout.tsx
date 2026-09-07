import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { CryptoGenLogo } from "../components/ui/CryptoGenLogo";
import { DashboardLinks } from "../components/DashboardLinks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { KeySquare, Menu, Settings } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import ClientSignOutButton from "../components/ClientSignOut";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { requireUser } from "../lib/hooks";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      keyz: true,
      accBal: true,
      userName: true,
    },
  });

  if (!data?.userName) {
    return redirect("/onboarding");
  }

  return data;
}

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();
  const userId = session.user?.id;

  if (!userId) {
    return redirect("/");
  }

  const data = await getData(userId);

  // ── Resolve who is logged in for the avatar ───────────────────────────────
  const displayName =
    data.userName ?? session.user?.name ?? session.user?.email ?? "Member";
  const initials = displayName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const avatarUrl = session.user?.image ?? null;

  return (
    <div className="min-h-screen w-full flex bg-gray-50/50">
      {/* ── Desktop Sidebar — sticky, stays put while content scrolls ── */}
      <aside className="hidden md:flex w-[260px] shrink-0 flex-col bg-white border-r border-gray-100 sticky top-0 h-screen overflow-y-auto">
        {/* Logo Area */}
        <div className="flex h-16 items-center px-6 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <CryptoGenLogo size={30} />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 py-6">
          <DashboardLinks />
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-100 bg-white/80 backdrop-blur-md px-4 lg:px-6">
          {/* Mobile Menu Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden shrink-0 h-9 w-9 p-0" variant="outline">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[260px] p-0 flex flex-col">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-16 items-center px-6 border-b border-gray-100">
                <Link href="/" className="flex items-center gap-2.5">
                  <CryptoGenLogo size={30} />
                </Link>
              </div>
              <div className="flex-1 py-6 overflow-y-auto">
                <DashboardLinks />
              </div>
            </SheetContent>
          </Sheet>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats Chips */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
              <span className="text-xs font-medium text-gray-500">Balance</span>
              <span className="text-sm font-bold text-gray-900">
                ${data.accBal?.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg">
              <KeySquare className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-sm font-bold text-gray-900">{data.keyz}</span>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-9 w-9 rounded-full p-0 overflow-hidden ring-1 ring-gray-200 hover:ring-indigo-300 transition-all"
                >
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    /* Initials fallback — always shows WHO is logged in */
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-600 text-[11px] font-semibold text-white">
                      {initials}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-56 mt-2" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full">
                      {avatarUrl ? (
                        <Image
                          src={avatarUrl}
                          alt={displayName}
                          width={36}
                          height={36}
                          className="h-full w-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center rounded-full bg-indigo-600 text-[11px] font-semibold text-white">
                          {initials}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900">
                        {displayName}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {session.user?.email || "Member"}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings" className="flex items-center cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <ClientSignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}