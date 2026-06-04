import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://agenticstack.sh";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AgenticStack — Compare Tools for AI Agents",
    template: "%s | AgenticStack",
  },
  description:
    "Compare tools for AI agent developers. Structured, editorially maintained data designed for both human developers and AI coding agents.",
  openGraph: {
    type: "website",
    siteName: "AgenticStack",
    title: "AgenticStack — Compare Tools for AI Agents",
    description:
      "Compare tools for AI agent developers. Structured, editorially maintained data designed for both human developers and AI coding agents.",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${dmSans.className}`}>
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
