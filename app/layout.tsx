import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://solvetrend.example.com";

export const metadata: Metadata = {
  title: "Solve Trend — Digital Marketing & Design Agency, Charlottetown PEI",
  description:
    "Solve Trend is a full-service digital marketing and design agency based in Charlottetown, PEI. We design, develop, and grow digital brands end-to-end.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Solve Trend — Digital Marketing & Design Agency",
    description:
      "End-to-end digital brand design, development and marketing from Charlottetown, PEI.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="https://cdn.prod.website-files.com/6904c591abb4bd2b6a67271b/6904ca7a4abbe56dfff89585_hero-marquee-img-02.avif"
          type="image/avif"
        />
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700&f[]=satoshi@400,500&display=swap"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
