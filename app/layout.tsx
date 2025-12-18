import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodesec - Cybersecurity, Development & Quality Testing",
  description:
    "Professional technology services including web & application development, comprehensive cybersecurity solutions, and quality assurance testing.",
  keywords: [
    "web development",
    "app development",
    "cybersecurity",
    "penetration testing",
    "QA testing",
    "quality assurance",
    "software development",
    "security audits",
    "vulnerability assessment",
    "Kodesec",
  ],
  authors: [{ name: "Kodesec" }],
  creator: "Kodesec",
  publisher: "Kodesec",
  robots: { index: true, follow: true },
  openGraph: {
    title: "Kodesec - Cybersecurity, Development & Quality Testing",
    description:
      "Delivering secure, scalable digital solutions through expert web development, cybersecurity, and quality assurance services.",
    type: "website",
    locale: "en_US",
    siteName: "Kodesec",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodesec - Cybersecurity, Development & Quality Testing",
    description:
      "Professional web development, cybersecurity, and QA testing services for businesses worldwide.",
  },
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
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} transition-colors duration-300 bg-[#0B0F1A] text-white`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
