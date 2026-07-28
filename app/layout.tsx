import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Mustassum Tanvir — Forward-Deployed AI Engineer",
  description:
    "I build intelligent systems that move from prototype to production.",
  openGraph: {
    title: "Mustassum Tanvir — Forward-Deployed AI Engineer",
    description: "Intelligent systems, engineered from prototype to production.",
    images: [{ url: "/og.png", width: 1728, height: 907, alt: "Mustassum Tanvir portfolio" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mustassum Tanvir — Forward-Deployed AI Engineer",
    description: "Intelligent systems, engineered from prototype to production.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#030207",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
