import { SITE } from "./seo";

const BASE = SITE.url;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: SITE.legalName,
    alternateName: [SITE.name, SITE.chineseName],
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/images/factory-gate.webp`,
      width: 1290,
      height: 1634,
    },
    description: SITE.description,
    foundingDate: String(SITE.foundingYear),
    numberOfEmployees: { "@type": "QuantitativeValue", value: 200 },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.countryCode,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "sales",
        availableLanguage: ["English", "Chinese"],
      },
    ],
    sameAs: [
      SITE.socialLinks.facebook,
      SITE.socialLinks.whatsapp,
      SITE.url,
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ManufacturingBusiness"],
    "@id": `${BASE}/#localbusiness`,
    name: SITE.legalName,
    alternateName: [SITE.name, SITE.chineseName],
    image: `${BASE}/images/factory-gate.webp`,
    url: BASE,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressCountry: SITE.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.5564,
      longitude: 104.9282,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: "Cambodia" },
      { "@type": "City", name: "Phnom Penh" },
      { "@type": "City", name: "Siem Reap" },
      { "@type": "City", name: "Battambang" },
      { "@type": "City", name: "Sihanoukville" },
    ],
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Bank Transfer, T/T",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Wire Mesh Products",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Welded Rebar Mesh" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Floor Slab Mesh" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Welded Fence Mesh" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Custom-Shape Mesh" } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Cold-Drawn Wire & Rod" } },
      ],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": `${BASE}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${BASE}/search?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${BASE}${item.href}`,
    })),
  };
}

export function productSchema(p: {
  name: string;
  description: string;
  image: string;
  sku: string;
  material: string;
  brand?: string;
  specs?: Record<string, string>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${BASE}${p.image}`,
    sku: p.sku,
    material: p.material,
    brand: {
      "@type": "Brand",
      name: p.brand ?? SITE.name,
    },
    manufacturer: { "@id": `${BASE}/#organization` },
    additionalProperty: p.specs
      ? Object.entries(p.specs).map(([name, value]) => ({
          "@type": "PropertyValue",
          name,
          value,
        }))
      : [],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      seller: { "@id": `${BASE}/#organization` },
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function webPageSchema(p: { title: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}${p.path}#webpage`,
    url: `${BASE}${p.path}`,
    name: p.title,
    description: p.description,
    isPartOf: { "@id": `${BASE}/#website` },
    publisher: { "@id": `${BASE}/#organization` },
  };
}
