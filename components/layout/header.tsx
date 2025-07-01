"use client";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="hidden lg:block">
          {session?.user?.role === 1 ? (
            <Link href="/admin/management" target="_blank">
              <span className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                포비오 어드민 파넬
              </span>
            </Link>
          ) : session?.user?.role === 2 ? (
            <Link href="/main" target="_blank">
              <span className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer">
                포비오
              </span>
            </Link>
          ) : null}
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        {/*{session?.user?.role === 2 && (
          <div className="flex-1 overflow-hidden whitespace-nowrap">
            <div className="animate-marquee">
              <strong>
                {session?.user?.username ?? "Guest"}님이 보유한 보석갯수는 0
                개이며 0개의 이미지를 비디오로 변환할수 있습니다. 100개의
                보석으로 이미지 한개를 비디오로 변환할수 있습니다.
              </strong>
            </div>
          </div>
        )}*/}
        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}
