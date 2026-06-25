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
  metadataBase: new URL("https://zhongyuesteel.com"),
  title: {
    default: "Zhongyue Steel — Professional Welded Rebar Mesh Manufacturer",
    template: "%s | Zhongyue Steel",
  },
  description:
    "ISO 9001 certified welded rebar mesh manufacturer in Cambodia. Wire 3–12mm, custom sizes, serving 60+ countries since 2002. Get a free quote in 24 hours.",
  keywords: [
    "welded mesh",
    "rebar mesh",
    "steel mesh",
    "construction mesh",
    "Cambodia",
    "焊接钢筋网",
    "中粤铁网",
  ],
  openGraph: {
    type: "website",
    siteName: "Zhongyue Steel",
    title: "Zhongyue Steel — Professional Welded Rebar Mesh Manufacturer",
    description:
      "ISO 9001 certified welded rebar mesh manufacturer in Cambodia. Custom sizes, 60+ countries served.",
    images: [{ url: "/images/factory-gate.jpg", width: 1290, height: 1634 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zhongyue Steel — Professional Welded Rebar Mesh Manufacturer",
    description:
      "ISO 9001 certified welded rebar mesh manufacturer in Cambodia.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
