import type { Metadata } from "next";
import Providers from "@/components/layout/providers";
import ThemeSwitch from "@/components/layout/ThemeToggle/theme-switch";
import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: "AI Image To Video Converter",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="ko" className="!scroll-smooth">
      <body>
        <NextTopLoader />
        <Providers session={session}>
          <Toaster />
          <ThemeSwitch />
          {children}
        </Providers>
      </body>
    </html>
  );
}
