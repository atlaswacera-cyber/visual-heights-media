import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Heights Media | Stories with Altitude",
  description:
    "A Chicago media production studio creating film, photography, and visual direction with clarity, character, and vintage soul.",
  icons: {
    icon: "/vhm-mark.png",
    shortcut: "/vhm-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
