import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Visual Heights Media | Stories with Altitude",
  description:
    "A Chicago media production studio creating film, photography, and visual direction with clarity, character, and vintage soul.",
  icons: {
    icon: [{ url: "/favicon.ico?v=6", type: "image/x-icon", sizes: "any" }],
    shortcut: "/favicon.ico?v=6",
    apple: "/apple-touch-icon.png?v=6",
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
        <link rel="icon" type="image/x-icon" href="/favicon.ico?v=6" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=6" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=6" />
        <link rel="preload" as="image" href="/atlas-wacera.jpg" />
      </head>
      <body>{children}</body>
    </html>
  );
}
