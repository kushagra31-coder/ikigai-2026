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

import IKIGAI2026_CONFIG from "@/config/event.config";
import DynamicBackground from "@/components/ui/DynamicBackground";

export const metadata: Metadata = {
  title: {
    template: `%s | ${IKIGAI2026_CONFIG.branding.eventName}`,
    default: `${IKIGAI2026_CONFIG.branding.eventName} - ${IKIGAI2026_CONFIG.branding.tagline}`,
  },
  description: IKIGAI2026_CONFIG.branding.mission,
  openGraph: {
    title: IKIGAI2026_CONFIG.branding.eventName,
    description: IKIGAI2026_CONFIG.branding.mission,
    url: IKIGAI2026_CONFIG.social.website,
    siteName: IKIGAI2026_CONFIG.branding.eventName,
    images: [
      {
        url: IKIGAI2026_CONFIG.assets.seo.ogImage,
        width: 1200,
        height: 630,
        alt: IKIGAI2026_CONFIG.branding.eventName,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: IKIGAI2026_CONFIG.branding.eventName,
    description: IKIGAI2026_CONFIG.branding.mission,
    images: [IKIGAI2026_CONFIG.assets.seo.twitterImage],
  },
  metadataBase: new URL(IKIGAI2026_CONFIG.social.website),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#FAF9F6] bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] opacity-70"></div>
        <ThemeProvider defaultTheme="light">
          <QueryProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hackathon",
              "name": IKIGAI2026_CONFIG.branding.eventName,
              "description": IKIGAI2026_CONFIG.branding.mission,
              "startDate": IKIGAI2026_CONFIG.timeline[0].start,
              "endDate": IKIGAI2026_CONFIG.timeline[IKIGAI2026_CONFIG.timeline.length - 1].end,
              "location": {
                "@type": "Place",
                "name": IKIGAI2026_CONFIG.branding.organizer.institute,
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": IKIGAI2026_CONFIG.branding.organizer.location,
                  "addressCountry": "IN"
                }
              },
              "organizer": {
                "@type": "Organization",
                "name": IKIGAI2026_CONFIG.branding.organizer.institute,
                "url": IKIGAI2026_CONFIG.social.website
              }
            })
          }}
        />
      </body>
    </html>
  );
}
