"use client";
import React, { useState } from "react";
import { DashboardNav } from "./dashboard-nav";
import { navItems, adminNavItems } from "@/constants/data";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import { useSession } from "next-auth/react";

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);
  const { data: session } = useSession();

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  return (
    <nav
      className={cn(
        `relative hidden h-screen flex-none border-r z-10 pt-20 md:block`,
        status && "duration-500",
        !isMinimized ? "w-72" : "w-[72px]",
        className
      )}
    >
      <ChevronLeft
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isMinimized && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="px-3 py-2">
        <div className="mt-3 space-y-1">
          {session?.user?.role === 1 ? (
            <DashboardNav items={adminNavItems} />
          ) : session?.user?.role === 2 ? (
            <DashboardNav items={navItems} />
          ) : null}
        </div>
      </div>
    </nav>
  );
}
