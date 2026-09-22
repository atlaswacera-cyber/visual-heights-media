import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Heights Media | Stories with Altitude",
  description:
    "A Chicago media production studio creating film, photography, and visual direction with clarity, character, and vintage soul.",
  icons: {
    icon: [{ url: "/favicon.svg?v=4", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon.svg?v=4",
    apple: "/favicon.png?v=4",
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=4" />
        <link rel="shortcut icon" href="/favicon.svg?v=4" />
        <link rel="preload" as="image" href="/atlas-wacera.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
