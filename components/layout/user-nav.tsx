"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export function UserNav() {
  const { data: session } = useSession();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center space-x-3 p-2 rounded-lg bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg shadow-lg border border-gray-200">
            <span className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
              {session?.user?.username ?? "Guest"}님
            </span>
            <Button variant="ghost" className="relative h-6 w-6 rounded-full">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={"/forbio.webp"}
                  alt={session?.user?.name ?? "Avatar"}
                />
                <AvatarFallback>
                  {session?.user?.name?.[0] ?? "G"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-56 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg border border-gray-200"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex justify-starter">
              <Link href="/main/user">
                <span className="ml-2 font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                  계정관리
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-starter">
              <Link href="">
                <span className="ml-2 font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                  크레딧 관리
                </span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex justify-starter"
              onClick={() => signOut()}
            >
              <span className="ml-2 font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                나가기
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
