import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/data/content";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import AskAI from "@/components/AskAI";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://karthikeyan.design"),
  title: `${site.name} — ${site.role}`,
  description: `${site.name} is a ${site.role.toLowerCase()} turning fuzzy problems into interfaces people actually finish.`,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: `${site.name} is a ${site.role.toLowerCase()} designing products end to end.`,
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
        <AskAI />
      </body>
    </html>
  );
}
