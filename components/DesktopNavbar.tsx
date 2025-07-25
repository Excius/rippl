import { BellIcon, HomeIcon, LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "./ModeToggle";
import { auth, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";

async function DesktopNavbar() {
  const session = await auth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href="/">
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>

      {session?.user ? (
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href="/notifications">
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Notifications</span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href={`/profile/${session.user.username ?? "null"}`}>
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
          </Button>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
              revalidatePath("/"); // Revalidate the home path after sign out
            }}
          >
            <Button
              variant="ghost"
              type="submit"
              className="flex items-center gap-2"
            >
              <LogOutIcon className="w-4 h-4" />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          </form>
        </div>
      ) : (
        <Link href="/auth/login">
          <Button variant="default">Sign In</Button>
        </Link>
      )}
    </div>
  );
}
export default DesktopNavbar;
