import { getSession } from "@/lib/getSession";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

async function Sidebar() {
  const session = await getSession();

  if (!session?.user) return <UnAuthenticatedSidebar />;
  return <div></div>;
}

const UnAuthenticatedSidebar = () => (
  <div className="sticky top-20">
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold">
          Welcome Back!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground mb-4">
          Login to access your profile and connect with others.
        </p>
        <Link href="/auth/login">
          <Button className="w-full" variant="outline">
            Login
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button className="w-full mt-2" variant="default">
            Sign Up
          </Button>
        </Link>
      </CardContent>
    </Card>
  </div>
);
export default Sidebar;
