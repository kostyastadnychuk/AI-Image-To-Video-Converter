"use client";
import { DashboardNav } from "./dashboard-nav";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems, adminNavItems } from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";

// import { Playlist } from "../data/playlists";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  // playlists: Playlist[];
}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <SheetContent
          side="left"
          className="!px-0"
          aria-describedby="sheet-description"
        >
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              {session?.user?.role === 1 ? (
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  포비오 어드민 파넬
                </h2>
              ) : session?.user?.role === 2 ? (
                <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                  포비오
                </h2>
              ) : null}
              <div className="space-y-1">
                {session?.user?.role === 1 ? (
                  <DashboardNav
                    items={adminNavItems}
                    isMobileNav={true}
                    setOpen={setOpen}
                  />
                ) : session?.user?.role === 2 ? (
                  <DashboardNav
                    items={navItems}
                    isMobileNav={true}
                    setOpen={setOpen}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
