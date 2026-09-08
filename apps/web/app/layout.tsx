import type { ReactNode } from "react";
import type { Metadata } from "next";
import "@repo/types";
import "@repo/ui/lib/utils";
import { Providers } from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillQuest",
  description: "Launch your career with ready online courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
