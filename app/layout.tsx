import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AuroraLab - Custom Watch Configurator",
  description: "Design your perfect custom watch with AuroraLab's interactive configurator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#1a1a1a] text-[#f5f1e8]">
        {children}
      </body>
    </html>
  );
}
