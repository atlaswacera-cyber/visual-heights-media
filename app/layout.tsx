import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Heights Media | Stories with Altitude",
  description:
    "A Chicago media production studio creating film, photography, and visual direction with clarity, character, and vintage soul.",
  icons: {
    icon: [{ url: "/favicon.png?v=3", type: "image/png", sizes: "128x128" }],
    shortcut: "/favicon.png?v=3",
    apple: "/favicon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/atlas-wacera.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
