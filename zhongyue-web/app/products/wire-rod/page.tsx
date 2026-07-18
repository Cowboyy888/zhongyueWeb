import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo";
import { productSchema, faqSchema, webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Cold-Drawn Steel Wire & Rod Cambodia — Q195/Q235 ≥570 MPa | ZY Steel",
  description:
    "Factory-direct cold-drawn steel wire and rod from Cambodia. Diameter 3–12mm, Q195/Q235, tensile strength ≥570 MPa. Coil and cut-to-length. Free quote — ZY Steel.",
  path: "/products/wire-rod",
  keywords: [
    "cold drawn wire Cambodia",
    "steel wire rod Cambodia",
    "Q195 wire Cambodia",
    "Q235 wire rod",
    "high tensile wire Cambodia",
    "binding wire Cambodia",
    "steel wire manufacturer Cambodia",
  ],
});

const FAQS = [
  {
    q: "What diameters of cold-drawn wire do you produce?",
    a: "We produce cold-drawn wire from 3mm to 12mm diameter. Standard sizes in stock are 4mm, 5mm, 6mm, 8mm, 10mm, and 12mm.",
  },
  {
    q: "Is the wire available in coils or straight lengths?",
    a: "Both forms are available. Coils are supplied in 100kg, 200kg, or 500kg coil weight. Straight-length rods are cut to 4m, 6m, or custom lengths.",
  },
  {
    q: "What steel grades are available?",
    a: "Standard grades are Q195 and Q235 low-carbon steel. Tensile strength is ≥570 MPa for Q195 and ≥470 MPa for Q235. High-carbon versions up to 0.65% C are available on request.",
  },
  {
    q: "What surface condition does the wire have?",
    a: "Standard wire is bright (clean, no coating). Galvanised wire (hot-dip or electro-galvanised) is available for corrosion-sensitive applications.",
  },
];

const RELATED = [
  { href: "/products/wire-mesh", name: "Welded Rebar Mesh" },
  { href: "/products/floor-mesh", name: "Floor Slab Mesh" },
  { href: "/products/fence-mesh", name: "Welded Fence Mesh" },
  { href: "/products/custom-mesh", name: "Custom-Shape Mesh" },
];

export default function WireRodPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd
        schema={[
          webPageSchema({ title: "Cold-Drawn Steel Wire & Rod Cambodia", description: "Q195/Q235 cold-drawn wire from Cambodia", path: "/products/wire-rod" }),
          productSchema({
            name: "Cold-Drawn Wire & Rod",
            description: "Cold-drawn Q195/Q235 steel wire and rod. Diameter 3–12mm, tensile strength ≥570 MPa. Available in coils and cut-to-length straight bars.",
            image: "/images/product-5.webp",
            sku: "ZY-CDW",
            material: "Q195 / Q235 low-carbon cold-drawn steel",
            specs: {
              "Wire Diameter": "3–12mm",
              Material: "Q195 / Q235",
              "Tensile Strength": "≥570 MPa (Q195) / ≥470 MPa (Q235)",
              Form: "Coil / Straight length",
              "Coil Weight": "100 / 200 / 500kg",
              Surface: "Bright / Galvanised",
            },
          }),
          faqSchema(FAQS),
        ]}
      />
      <div className="mx-auto max-w-4xl">
        <Breadcrumb items={[{ name: "Home", href: "/" }, { name: "Products", href: "/products" }, { name: "Cold-Drawn Wire & Rod", href: "/products/wire-rod" }]} />
        <header className="mb-12">
          <div className="mb-3 flex flex-wrap gap-2">
            {["Q195/Q235", "≥570 MPa", "Coil & Straight", "3–12mm"].map((c) => (
              <span key={c} className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-medium text-amber-400">{c}</span>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Cold-Drawn Wire & Rod</h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Factory-direct Q195/Q235 cold-drawn steel wire from Cambodia. Diameter 3–12mm,
            tensile strength ≥570 MPa. Available in coils or cut-to-length. Ideal for wire
            mesh production, binding wire, and direct construction use.
          </p>
        </header>

        <section aria-labelledby="specs-heading" className="mb-12">
          <h2 id="specs-heading" className="mb-6 text-2xl font-bold text-white">Technical Specifications</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Q195</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Q235</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-400">
                {[
                  ["Wire Diameter", "3–12mm", "3–12mm"],
                  ["Tensile Strength", "≥570 MPa", "≥470 MPa"],
                  ["Yield Strength", "≥390 MPa", "≥335 MPa"],
                  ["Elongation", "≥10%", "≥22%"],
                  ["Carbon Content", "0.06–0.12%", "0.12–0.20%"],
                  ["Surface", "Bright / Galvanised", "Bright / Galvanised"],
                  ["Form", "Coil / Straight", "Coil / Straight"],
                ].map(([p, v1, v2]) => (
                  <tr key={p}><td className="px-4 py-3 font-medium text-zinc-300">{p}</td><td className="px-4 py-3">{v1}</td><td className="px-4 py-3">{v2}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="app-heading" className="mb-12">
          <h2 id="app-heading" className="mb-6 text-2xl font-bold text-white">Applications</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Mesh Production", desc: "Raw material for welded wire mesh and rebar mesh manufacturing." },
              { title: "Binding Wire", desc: "On-site bar tying and general construction binding applications." },
              { title: "Concrete Reinforcement", desc: "Straight bars used in lightweight concrete or mortar reinforcement." },
              { title: "Agricultural Use", desc: "Fencing, animal enclosures, vineyard training, trellis systems." },
            ].map((a) => (
              <div key={a.title} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <h3 className="mb-1 font-semibold text-white">{a.title}</h3>
                <p className="text-sm text-zinc-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="mb-6 text-2xl font-bold text-white">FAQ — Cold-Drawn Wire</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-2 font-semibold text-white">{q}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="related-heading" className="mb-12">
          <h2 id="related-heading" className="mb-6 text-xl font-bold text-white">Related Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-medium text-zinc-300 transition-colors hover:border-amber-400/50 hover:text-amber-400">{r.name} →</Link>
            ))}
          </div>
        </section>

        <section aria-label="Quote CTA" className="rounded-2xl bg-amber-400 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-zinc-950">Request Wire & Rod Quote</h2>
          <p className="mb-6 text-zinc-800">Specify diameter, grade, form (coil/straight), and quantity — factory-direct price in 24 hours.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`tel:${SITE.phone}`} className="rounded-full bg-zinc-950 px-8 py-3 font-semibold text-white hover:bg-zinc-800">{SITE.phoneDisplay}</a>
            <Link href="/contact" className="rounded-full border-2 border-zinc-950 px-8 py-3 font-semibold text-zinc-950 hover:bg-zinc-950 hover:text-white">Send Inquiry</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
