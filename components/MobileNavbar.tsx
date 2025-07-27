"use client";

import {
  BellIcon,
  HomeIcon,
  LogOutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { revalidatePath } from "next/cache";

interface MobileNavbarProps {
  user?: {
    id?: string;
    email?: string | null;
    name?: string | null;
    username?: string | null;
  } | null;
}

function MobileNavbar({ user }: MobileNavbarProps) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>
              <div className="text-center">Menu</div>
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start mb-2 ml-4"
              asChild
              onClick={() => setShowMobileMenu(false)}
            >
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Home
              </Link>
            </Button>

            {user ? (
              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/notifications">
                    <BellIcon className="w-4 h-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start"
                  asChild
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href={`/profile/${user.username ?? "null"}`}>
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </Link>
                </Button>

                <Button
                  onClick={() => {
                    setShowMobileMenu(false);
                    revalidatePath("/");
                    signOut({ redirectTo: "/" });
                  }}
                  variant="ghost"
                  type="submit"
                  className="flex items-center gap-3 justify-start w-full"
                >
                  <LogOutIcon className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex justify-center">
                <Button
                  variant="default"
                  className="mt-4 w-10/12"
                  asChild
                  onClick={() => setShowMobileMenu(false)}
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
