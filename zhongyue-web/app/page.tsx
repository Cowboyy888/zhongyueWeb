import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SocialFollow from "@/components/SocialFollow";
import { buildMetadata, SITE } from "@/lib/seo";
import { faqSchema, webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "ZY Steel — Wire Mesh Manufacturer Cambodia | Factory Direct",
  description:
    "Cambodia's leading welded wire mesh manufacturer since 2002. ISO 9001 certified. Wire diameter 3–12mm, custom sizes. GB/T · BS · ASTM standards. 60+ export countries. Free quote in 24h.",
  path: "/",
  keywords: [
    "wire mesh manufacturer Cambodia",
    "welded wire mesh Cambodia",
    "steel mesh factory Cambodia",
    "reinforcement mesh supplier",
    "ZY Steel Cambodia",
  ],
});

const HOME_FAQS = [
  {
    q: "What is the minimum order quantity for wire mesh from ZY Steel?",
    a: "ZY Steel accepts orders from 1 metric ton. For standard welded rebar mesh (4–12mm wire, 100–200mm spacing), typical project orders range from 10–500 tons. Contact us for a custom quote.",
  },
  {
    q: "What certifications does ZY Steel hold?",
    a: "ZY Steel is ISO 9001:2015 certified. Our products meet GB/T 1499.3, BS 4483, and ASTM A1064 international standards. Full mill test reports are provided with every shipment.",
  },
  {
    q: "How long is the lead time for wire mesh orders?",
    a: "Standard products ship within 7–14 days. Custom-size or special specification orders typically require 15–25 days. Rush orders can be arranged — contact us to discuss.",
  },
  {
    q: "Which countries does ZY Steel export to?",
    a: "ZY Steel currently exports to 60+ countries across Southeast Asia, South Asia, the Middle East, Africa, and beyond. We handle all export documentation and logistics.",
  },
  {
    q: "Can ZY Steel produce custom wire mesh sizes?",
    a: "Yes. We manufacture custom-shape mesh panels including L-shape, T-shape, curved, and stepped profiles. Tolerances within ±5mm. Send your drawings for a free evaluation.",
  },
];

const PRODUCTS = [
  {
    href: "/products/wire-mesh",
    name: "Welded Rebar Mesh",
    spec: "4–12mm · 100–200mm spacing · GB/T 1499.3",
    desc: "High-strength welded mesh for concrete slabs, walls, and structural reinforcement.",
  },
  {
    href: "/products/floor-mesh",
    name: "Floor Slab Mesh",
    spec: "6–10mm · 150mm spacing · HRB400",
    desc: "Pre-cut panels optimised for floor-slab pours. Faster placement, zero waste.",
  },
  {
    href: "/products/fence-mesh",
    name: "Welded Fence Mesh",
    spec: "3–6mm · 50–100mm openings · galvanized",
    desc: "Galvanised or powder-coated panels for perimeter security and agricultural fencing.",
  },
  {
    href: "/products/custom-mesh",
    name: "Custom-Shape Mesh",
    spec: "L/T/curved/stepped · ±5mm · 7–15 day lead",
    desc: "Factory-bent to your drawings. Reduces site cutting and speeds up installation.",
  },
  {
    href: "/products/wire-rod",
    name: "Cold-Drawn Wire & Rod",
    spec: "3–12mm · Q195/Q235 · ≥570 MPa",
    desc: "Precision-drawn wire for downstream manufacturing or direct construction use.",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={[
          webPageSchema({
            title: "ZY Steel — Wire Mesh Manufacturer Cambodia",
            description: SITE.description,
            path: "/",
          }),
          faqSchema(HOME_FAQS),
        ]}
      />

      <main id="main-content">
        {/* ── HERO ── */}
        <section
          aria-label="Hero"
          className="relative flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber-400">
            ISO 9001 Certified · Est. {SITE.foundingYear}
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Wire Mesh Manufacturer
            <span className="mt-2 block text-2xl font-normal text-zinc-400 sm:text-3xl">
              Cambodia&apos;s Factory-Direct Steel Mesh Supplier
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {SITE.legalName} ({SITE.chineseName}) produces welded wire mesh, rebar mesh, fence
            mesh, and cold-drawn wire for construction projects across{" "}
            <strong className="text-white">{SITE.countries} countries</strong>. Wire diameter
            3–12mm. GB/T · BS · ASTM certified. Free quote in 24 hours.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={`tel:${SITE.phone}`}
              className="rounded-full bg-amber-400 px-8 py-3 font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-zinc-600 px-8 py-3 text-zinc-300 transition-colors hover:border-zinc-400 hover:text-white"
            >
              WhatsApp Inquiry
            </a>
          </div>

          {/* Trust signals */}
          <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {[
              { value: SITE.foundingYear, label: "Est. Year" },
              { value: SITE.countries, label: "Export Countries" },
              { value: SITE.capacity, label: "Annual Capacity" },
              { value: "ISO 9001", label: "Certified" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-amber-400 sm:text-3xl">{s.value}</div>
                <div className="mt-1 text-sm text-zinc-500">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section aria-labelledby="products-heading" className="bg-zinc-900 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2
              id="products-heading"
              className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl"
            >
              Wire Mesh Products
            </h2>
            <p className="mb-12 text-center text-zinc-400">
              Factory-direct from Cambodia — every product meets international standards
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group rounded-xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-amber-400/50 hover:bg-zinc-900"
                >
                  <h3 className="mb-1 font-semibold text-white group-hover:text-amber-400">
                    {p.name}
                  </h3>
                  <p className="mb-3 text-xs text-amber-400/80">{p.spec}</p>
                  <p className="text-sm leading-relaxed text-zinc-400">{p.desc}</p>
                  <span className="mt-4 inline-block text-sm font-medium text-amber-400">
                    View specs →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/products"
                className="inline-block rounded-full border border-amber-400 px-8 py-3 text-amber-400 transition-colors hover:bg-amber-400 hover:text-zinc-950"
              >
                All Products
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHY ZY STEEL ── */}
        <section aria-labelledby="why-heading" className="bg-zinc-950 px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2
              id="why-heading"
              className="mb-4 text-center text-3xl font-bold text-white sm:text-4xl"
            >
              Why Choose ZY Steel?
            </h2>
            <p className="mb-12 text-center text-zinc-400">
              Cambodia&apos;s most trusted wire mesh manufacturer — here&apos;s why
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "ISO 9001:2015 Certified",
                  desc: "Every batch tested to GB/T 1499.3, BS 4483, and ASTM A1064. Mill test reports shipped with every order.",
                },
                {
                  title: "Factory-Direct Pricing",
                  desc: "No middlemen. We manufacture, we ship. Typical savings of 15–30% vs. trading company pricing.",
                },
                {
                  title: "Custom Sizes Available",
                  desc: "Non-standard diameters, spacings, panel lengths, and bent shapes. Your drawing → our production.",
                },
                {
                  title: "200,000 ton/year Capacity",
                  desc: "Scale from a pilot shipment to full project supply without changing suppliers.",
                },
                {
                  title: "60+ Country Export Record",
                  desc: "We handle all export documentation, phytosanitary certificates, and shipping logistics.",
                },
                {
                  title: "24h Quote Turnaround",
                  desc: "Send specs and quantity — we reply with pricing within one business day, including freight to your port.",
                },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                  <h3 className="mb-2 font-semibold text-amber-400">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICE AREAS ── */}
        <section aria-labelledby="service-heading" className="bg-zinc-900 px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 id="service-heading" className="mb-4 text-2xl font-bold text-white">
              Serving Cambodia &amp; Beyond
            </h2>
            <p className="mb-8 text-zinc-400">
              Based in Cambodia — supply to construction projects nationwide and across the region
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Phnom Penh",
                "Siem Reap",
                "Battambang",
                "Sihanoukville",
                "Kampong Cham",
                "Southeast Asia",
                "Middle East",
                "Africa",
              ].map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-300"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL FOLLOW ── */}
        <SocialFollow />

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-heading" className="bg-zinc-950 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2
              id="faq-heading"
              className="mb-12 text-center text-3xl font-bold text-white sm:text-4xl"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {HOME_FAQS.map(({ q, a }) => (
                <div key={q} className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
                  <h3 className="mb-3 font-semibold text-white">{q}</h3>
                  <p className="text-sm leading-relaxed text-zinc-400">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section aria-label="Contact call to action" className="bg-amber-400 px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-zinc-950 sm:text-4xl">
              Get a Free Wire Mesh Quote
            </h2>
            <p className="mb-8 text-zinc-800">
              Send your specifications — wire diameter, spacing, panel size, quantity — and receive
              a factory-direct price within 24 hours.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href={`tel:${SITE.phone}`}
                className="rounded-full bg-zinc-950 px-8 py-3 font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Call {SITE.phoneDisplay}
              </a>
              <Link
                href="/contact"
                className="rounded-full border-2 border-zinc-950 px-8 py-3 font-semibold text-zinc-950 transition-colors hover:bg-zinc-950 hover:text-white"
              >
                Send Inquiry
              </Link>
            </div>
          </div>
        </section>
      </main>

    </>
  );
}
