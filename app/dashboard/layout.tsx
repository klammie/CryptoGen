import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import Logo from "@/public/assets/logosaas.png";
import { DashboardLinks } from "../components/DashboardLinks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { KeySquare, Menu } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
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
} from "@radix-ui/react-dropdown-menu";

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

  const data = await getData(session?.user?.id as string);

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" className="size-12" />
                <p className="text-xl font-bold">
                  Crypto<span className="text-primary">Gen</span>
                </p>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            {/*<div>{data.userName}</div>*/}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0"
                  size="icon"
                  variant="outline"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetTitle></SheetTitle>
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="font-bold">${data.accBal}</div>
            <div className="flex justify-center items-center flex-row">
              <KeySquare className="size-4 mr-1" />
              <p className="font-semibold">x{data.keyz}</p>
            </div>
            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <img
                      className="h-full w-full rounded-full"
                      src={session.user?.image as string}
                      alt="Profile Image"
                      height={20}
                      width={20}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 p-2 mt-2 w-56"
                >
                  <DropdownMenuLabel className="text-gray-700 dark:text-gray-200 font-medium text-sm mb-2">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="border-t border-gray-200 dark:border-gray-700 my-2" />
                  <DropdownMenuItem asChild>
                    <a
                      href="/dashboard"
                      className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm"
                    >
                      Settings
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="/home"
                      className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md text-sm"
                    >
                      Log Out
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

{
  /*Inline server action
  <form
    className="w-full"
    action={async () => {
      "use server";
      await signOut();
    }}
  >
    <button className="w-full text-left">Log out</button>
  </form>*/
}
