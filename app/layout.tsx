import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kinetic | Private Image Motion Studio",
  description:
    "A private local-first workspace for shaping still images into motion.",
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
