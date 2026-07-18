import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, localBusinessSchema, websiteSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: "#c8a96e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Wire Mesh Manufacturer Cambodia`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "Manufacturing",
  classification: "Steel Wire Mesh Manufacturer",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    title: `${SITE.name} — Wire Mesh Manufacturer Cambodia`,
    description: SITE.description,
    url: SITE.url,
    images: [
      {
        url: `${SITE.url}${SITE.ogImage}`,
        width: 1290,
        height: 1634,
        alt: `${SITE.name} — ISO 9001 Wire Mesh Manufacturer Cambodia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Wire Mesh Manufacturer Cambodia`,
    description: SITE.description,
    images: [`${SITE.url}${SITE.ogImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  verification: {
    // Add Google Search Console verification token here when available
    // google: "your-google-verification-token",
  },
  alternates: {
    canonical: SITE.url,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://embed.tawk.to" />
        <JsonLd schema={[organizationSchema(), localBusinessSchema(), websiteSchema()]} />
      </head>
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
