'use client';
import React from 'react';
import ThemeContextProvider  from './ThemeToggle/theme-context';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeContextProvider>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </ThemeContextProvider>
    </>
  );
}
