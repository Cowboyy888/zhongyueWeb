import type { Metadata } from "next";

export const SITE = {
  url: "https://www.zysteels.net",
  name: "ZY Steel",
  legalName: "Zhongyue Steel Wire Group",
  chineseName: "中粤铁网公司",
  tagline: "Factory-Direct Welded Wire Mesh Manufacturer in Cambodia",
  description:
    "ISO 9001 certified welded wire mesh manufacturer in Cambodia. Wire diameter 3–12mm, custom sizes, GB/T · BS · ASTM certified. Serving 60+ countries since 2002. Get a free quote in 24 hours.",
  phone: "+855764976187",
  phoneDisplay: "+855 76 497 6187",
  email: "zysteel@zohomail.com",
  address: {
    street: "CJJG+HHH, Khum Trapeang Kong",
    city: "Phnom Penh",
    country: "Cambodia",
    countryCode: "KH",
  },
  hours: "Mo-Sa 08:00-17:00",
  foundingYear: 2002,
  employees: "200+",
  countries: "60+",
  capacity: "200,000 tons/year",
  certifications: ["ISO 9001", "GB/T 1499.3", "BS 4483", "ASTM A1064"],
  // Update facebook/messenger to your actual Facebook Page username
  facebookAppId: "", // Add your App ID from developers.facebook.com/apps
  socialLinks: {
    whatsapp: "https://wa.me/855764976187",
    facebook: "https://www.facebook.com/zysteels",
    messenger: "https://m.me/zysteels",
  },
  ogImage: "/images/factory-gate.webp",
  locale: "en_US",
  keywords: [
    "wire mesh Cambodia",
    "steel mesh Cambodia",
    "welded wire mesh",
    "reinforcement mesh",
    "construction steel Cambodia",
    "steel factory Cambodia",
    "wire mesh manufacturer Cambodia",
    "steel wire Cambodia",
    "concrete reinforcement mesh",
    "factory direct steel mesh",
    "rebar mesh Cambodia",
    "welded rebar mesh",
    "GB/T wire mesh",
    "BS 4483 mesh",
    "ASTM A1064 mesh",
    "HRB400 mesh",
    "custom wire mesh",
    "floor slab mesh",
    "fence mesh Cambodia",
    "cold-drawn wire Cambodia",
  ] as string[],
} as const;

export const PAGES = {
  home: { path: "/", lastmod: "2026-07-18", priority: 1.0, changeFreq: "weekly" as const },
  products: { path: "/products", lastmod: "2026-07-18", priority: 0.9, changeFreq: "monthly" as const },
  wireMesh: { path: "/products/wire-mesh", lastmod: "2026-07-18", priority: 0.9, changeFreq: "monthly" as const },
  floorMesh: { path: "/products/floor-mesh", lastmod: "2026-07-18", priority: 0.9, changeFreq: "monthly" as const },
  fenceMesh: { path: "/products/fence-mesh", lastmod: "2026-07-18", priority: 0.9, changeFreq: "monthly" as const },
  customMesh: { path: "/products/custom-mesh", lastmod: "2026-07-18", priority: 0.9, changeFreq: "monthly" as const },
  wireRod: { path: "/products/wire-rod", lastmod: "2026-07-18", priority: 0.9, changeFreq: "monthly" as const },
  blog: { path: "/blog", lastmod: "2026-07-18", priority: 0.7, changeFreq: "weekly" as const },
  contact: { path: "/contact", lastmod: "2026-07-18", priority: 0.8, changeFreq: "monthly" as const },
} as const;

export function buildMetadata(overrides: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE.url}${overrides.path}`;
  const image = overrides.ogImage ?? SITE.ogImage;

  return {
    metadataBase: new URL(SITE.url),
    title: overrides.title,
    description: overrides.description,
    keywords: [...(overrides.keywords ?? []), ...SITE.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url,
      title: overrides.title,
      description: overrides.description,
      locale: SITE.locale,
      images: [
        {
          url: image,
          width: 1290,
          height: 1634,
          alt: `${SITE.name} — ${overrides.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: overrides.title,
      description: overrides.description,
      images: [image],
    },
    robots: overrides.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
