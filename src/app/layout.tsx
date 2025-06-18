// =============================================
// FILE: src/app/layout.tsx
// DESCRIPTION: Root layout for Uploadthing server
// =============================================

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BestiePals Upload Server",
  description: "Uploadthing server for BestiePals photo uploads",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
