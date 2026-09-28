import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import TopBar from "@/components/layout/TopBar";
import Footer from "@/components/layout/Footer";
import VideoFacade from "@/components/content/VideoFacade";
import SceneEffects from "@/components/effects/SceneEffects";
import JsonLd from "@/components/JsonLd";
import { THEME_SCRIPT } from "@/components/theme/theme";
import { getSite } from "@/lib/content/loaders";
import { SITE_URL, organizationLd, websiteLd } from "@/lib/seo";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const site = getSite();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kodesec — Penetration Testing, Secure Engineering & Security Academy", template: "%s | Kodesec" },
  description: site.description,
  applicationName: "Kodesec",
  authors: [{ name: "Kodesec", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Kodesec", locale: "en_US", url: SITE_URL },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030605" },
    { media: "(prefers-color-scheme: light)", color: "#f7f9f8" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        {/* apply the saved theme before first paint (no flash) */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      {site.analytics.gtmId && <GoogleTagManager gtmId={site.analytics.gtmId} />}
      <body className="min-h-dvh">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black">
          Skip to content
        </a>
        <div className="page-rails" aria-hidden="true" />
        <JsonLd data={[organizationLd(), websiteLd()]} />
        {site.topBar?.text && <TopBar text={site.topBar.text} href={site.topBar.href} />}
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {site.analytics.ga4Id && <GoogleAnalytics gaId={site.analytics.ga4Id} />}
        <VideoFacade />
        <SceneEffects />
      </body>
    </html>
  );
}
