"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { UserNav } from "@/components/layout/user-nav";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    checkSession();
  }, []);

  const handleButtonClick = () => {
    router.push("/main");
  };

  return (
    <div className="flex justify-center items-center mt-10 md:mt-0 supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex justify-center items-center fixed top-[0.15rem] md:right-20 h-12 py-2 sm:top-[1.7rem] sm:h-[initial] sm:py-0">
        <ul className="flex flex-wrap items-center justify-end gap-y-1 text-[0.9rem] font-medium text-gray-500 sm:flex-nowrap sm:gap-5">
          <motion.li
            className="h-3/4 flex items-center justify-center relative w-[150px]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {session ? (
              <Button className="flex w-96 items-center justify-center bg-red-300 px-3 py-3 text-center text-lg font-bold text-black hover:bg-red-800 transition dark:text-gray-100 dark:hover:text-gray-300" onClick={handleButtonClick}>
                에디터 시작
              </Button>
            ) : (
              <Link
                className="flex w-full items-center justify-center bg-red-200 rounded-full px-3 py-3 text-center text-lg font-bold text-black hover:bg-red-800 transition dark:text-gray-800 dark:hover:text-gray-300"
                href="/login"
              >
                로그인
                <motion.span
                  className="bg-blue-100 rounded-full absolute inset-0 -z-10 dark:bg-blue-800 border-1 border-blue-500 group-hover:bg-blue-500"
                  layoutId="activeSection"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                ></motion.span>
              </Link>
            )}
          </motion.li>
          <motion.li
            className="h-3/4 flex items-center justify-center relative w-[150px]"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {session ? (
              <div className="flex items-center gap-2">
                <UserNav />
              </div>
            ) : (
              <Link
                className="flex w-full items-center justify-center bg-red-200 rounded-full px-3 py-3 text-center text-lg font-bold text-black hover:bg-red-800 transition dark:text-gray-800 dark:hover:text-gray-300"
                href="/signup"
              >
                가입
                <motion.span
                  className="bg-blue-100 rounded-full absolute inset-0 -z-10 dark:bg-blue-800 border-1 border-blue-500 group-hover:bg-blue-500"
                  layoutId="activeSection"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                ></motion.span>
              </Link>
            )}
          </motion.li>
        </ul>
      </nav>
    </div>
  );
}
