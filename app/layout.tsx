import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kodesec Solutions - Web Development, Security & QA Testing Services",
  description: "Transform your digital presence with Kodesec Solutions. Expert web & app development, comprehensive security testing, and rigorous QA services. Building secure, scalable, and stunning digital experiences.",
  keywords: "web development, app development, security testing, penetration testing, QA testing, cybersecurity, software development, custom applications, vulnerability assessment, quality assurance",
  authors: [{ name: "Kodesec Solutions" }],
  creator: "Kodesec Solutions",
  publisher: "Kodesec Solutions",
  robots: "index, follow",
  openGraph: {
    title: "Kodesec Solutions - Web Development, Security & QA Testing",
    description: "Crafting secure, scalable, and stunning digital experiences through innovative development and rigorous testing.",
    type: "website",
    locale: "en_US",
    siteName: "Kodesec Solutions",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodesec Solutions - Web Development, Security & QA Testing",
    description: "Crafting secure, scalable, and stunning digital experiences through innovative development and rigorous testing.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={geistMono.className}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
