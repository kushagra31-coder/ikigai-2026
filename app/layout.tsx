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

import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

import { EVENT_CONFIG } from "@/config/event.config";

export const metadata: Metadata = {
  title: {
    template: `%s | ${EVENT_CONFIG.name}`,
    default: EVENT_CONFIG.name,
  },
  description: EVENT_CONFIG.description,
  openGraph: {
    title: EVENT_CONFIG.name,
    description: EVENT_CONFIG.description,
    url: 'https://ikigai.acropolis.in',
    siteName: EVENT_CONFIG.name,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: EVENT_CONFIG.name,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: EVENT_CONFIG.name,
    description: EVENT_CONFIG.description,
    images: ['/og-image.jpg'],
  },
  metadataBase: new URL('https://ikigai.acropolis.in'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="dark">
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
