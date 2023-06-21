"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { IoMdArrowDropdown } from "react-icons/io";

import Container from "./Container";
import { Button } from "./ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="p-4 flat">
      <Container className="flex justify-between">
        <div>LOGO</div>
        <div>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex items-center justify-center text-sm font-medium gap-1">
                {session.user?.name}
                <IoMdArrowDropdown className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/profile/${session.user?.name}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center justify-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button className="mr-5" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
      <Container className="flex justify-between">
        <nav>
          <ul>
            <li>
              <Link
                href="/"
                className={pathname === "/" ? "text-amber-500" : ""}
              >
                Browse
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
