import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";
import Loader from "@/components/loader/Loader";
import AppointmentModal from "@/components/contact/AppointmentModal";
import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from '@next/third-parties/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kodesec.com"),
  title: {
    default: "Kodesec | Cybersecurity & Software Engineering",
    template: "%s | Kodesec",
  },
  description:
    "Professional technology services including secure application development, penetration testing, Cloud security audits, DevSecOps pipelines, and quality assurance testing.",
  keywords: [
    "web development",
    "secure coding",
    "cybersecurity",
    "penetration testing",
    "DevSecOps",
    "QA testing",
    "quality assurance",
    "software engineering",
    "security audits",
    "vulnerability assessment",
    "Kodesec",
    "cloud security",
  ],
  authors: [{ name: "Kodesec", url: "https://kodesec.com" }],
  creator: "Kodesec",
  publisher: "Kodesec",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Kodesec | Cybersecurity & Software Engineering",
    description:
      "Professional Technology Services including secure software development, offensive penetration testing, Cloud security, and quality assurance.",
    type: "website",
    locale: "en_US",
    siteName: "Kodesec",
    url: "https://kodesec.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodesec | Cybersecurity & Software Engineering",
    description:
      "Secure software development, offensive penetration testing, and quality assurance services for SaaS, Fintech, and Enterprise.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://kodesec.com/#organization",
    "name": "Kodesec",
    "url": "https://kodesec.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kodesec.com/assets/Logo.png"
    },
    "sameAs": [
      "https://github.com/kodesec",
      "https://linkedin.com/company/kodesec"
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kodesec.com/#website",
    "url": "https://kodesec.com",
    "name": "Kodesec",
    "publisher": {
      "@id": "https://kodesec.com/#organization"
    }
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-sans dark",
        spaceGrotesk.variable,
        plusJakartaSans.variable,
        jetBrainsMono.variable
      )}
    >
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LH10BFSBJQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-LH10BFSBJQ');
          `}
        </Script>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=optional"
        />
      </head>
      <GoogleTagManager gtmId="GTM-PX3H2865" />
      <body
        className="transition-colors duration-300 bg-[#030609] text-white antialiased selection:bg-primary/30 selection:text-primary relative"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <JsonLd schema={orgSchema} />
          <JsonLd schema={websiteSchema} />
          <Toaster />
          
          {/* FIXED BACKGROUND AMBIENT GLOW SYSTEM (Stays fixed while scrolling like Boraq.io) */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Top Center Glow */}
            <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[170px] rounded-full" />
            {/* Right Side Subtle Glow */}
            <div className="fixed top-[45%] right-[-15%] w-[700px] h-[700px] bg-primary/5 blur-[190px] rounded-full" />
            {/* Left Side Subtle Glow */}
            <div className="fixed bottom-[-10%] left-[-15%] w-[700px] h-[700px] bg-primary/5 blur-[190px] rounded-full" />
          </div>

          <Loader>
            <AppointmentModal />
            <Header />
            <main className="min-h-screen pt-24 relative z-10 bg-transparent">
              {children}
            </main>
            <Footer />
          </Loader>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-LH10BFSBJQ" />
    </html>
  );
}
