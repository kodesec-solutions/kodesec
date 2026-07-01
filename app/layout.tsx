import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";
import JsonLd from "@/components/JsonLd";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} transition-colors duration-300 bg-background text-foreground antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <JsonLd schema={orgSchema} />
          <JsonLd schema={websiteSchema} />
          <Toaster />
          <Header />
          <main className="min-h-screen pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
