import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo";
import { productSchema, faqSchema, webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Floor Slab Mesh Cambodia — HRB400 Pre-cut Panels | ZY Steel",
  description:
    "Factory-direct floor slab mesh from Cambodia. HRB400, 6–10mm wire, 150mm spacing. Pre-cut panels for faster installation. ISO 9001 certified. Free quote — ZY Steel.",
  path: "/products/floor-mesh",
  keywords: [
    "floor slab mesh Cambodia",
    "concrete floor mesh",
    "HRB400 mesh Cambodia",
    "pre-cut mesh panels",
    "floor reinforcement mesh",
  ],
});

const FAQS = [
  {
    q: "What sizes do floor slab mesh panels come in?",
    a: "Standard panels are 2×4m and 2×6m with 150×150mm spacing. Custom panel sizes are produced to order — send your slab layout drawings for a cutting schedule.",
  },
  {
    q: "What steel grade is used for floor mesh?",
    a: "Our standard floor mesh uses HRB400 deformed bar wire. HRB500 is available on request for higher-load slabs.",
  },
  {
    q: "Can floor mesh be supplied with chairs or supports?",
    a: "Yes. We supply plastic bar chairs (75mm, 100mm height) to match your slab depth. Contact us for a bundled quote.",
  },
  {
    q: "What is the weight of a standard floor mesh panel?",
    a: "A 2×4m panel with 6mm wire at 150mm spacing weighs approximately 28kg. 8mm wire panels weigh approximately 50kg. Exact weights per your specification on request.",
  },
];

const RELATED = [
  { href: "/products/wire-mesh", name: "Welded Rebar Mesh" },
  { href: "/products/fence-mesh", name: "Welded Fence Mesh" },
  { href: "/products/custom-mesh", name: "Custom-Shape Mesh" },
  { href: "/products/wire-rod", name: "Cold-Drawn Wire & Rod" },
];

export default function FloorMeshPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd
        schema={[
          webPageSchema({ title: "Floor Slab Mesh Cambodia", description: "HRB400 pre-cut floor slab mesh from Cambodia", path: "/products/floor-mesh" }),
          productSchema({
            name: "Floor Slab Mesh",
            description: "HRB400 pre-cut floor slab mesh panels for concrete floor reinforcement. 6–10mm wire, 150mm spacing. ISO 9001 certified.",
            image: "/images/product-2.webp",
            sku: "ZY-FSM",
            material: "HRB400 deformed steel bar",
            specs: {
              "Wire Diameter": "6 / 8 / 10mm",
              Spacing: "150×150mm standard",
              "Panel Size": "2×4m / 2×6m (custom available)",
              Grade: "HRB400",
              Standard: "GB/T 1499.3",
            },
          }),
          faqSchema(FAQS),
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <Breadcrumb
          items={[
            { name: "Home", href: "/" },
            { name: "Products", href: "/products" },
            { name: "Floor Slab Mesh", href: "/products/floor-mesh" },
          ]}
        />

        <header className="mb-12">
          <div className="mb-3 flex flex-wrap gap-2">
            {["HRB400", "Pre-cut Panels", "ISO 9001", "GB/T 1499.3"].map((c) => (
              <span key={c} className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-medium text-amber-400">{c}</span>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Floor Slab Mesh</h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Pre-cut HRB400 floor slab mesh panels from Cambodia. Wire 6–10mm, 150mm spacing.
            Faster site installation with zero waste — no site cutting or bar tying required.
          </p>
        </header>

        <section aria-labelledby="specs-heading" className="mb-12">
          <h2 id="specs-heading" className="mb-6 text-2xl font-bold text-white">Technical Specifications</h2>
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead className="bg-zinc-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Standard</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-300">Custom</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 text-zinc-400">
                {[
                  ["Wire Diameter", "6 / 8 / 10mm", "Any within 6–12mm"],
                  ["Mesh Spacing", "150×150mm", "Custom"],
                  ["Panel Length", "4m / 6m", "Up to 9m"],
                  ["Panel Width", "2m", "Up to 2.4m"],
                  ["Steel Grade", "HRB400", "HRB500 on request"],
                  ["Tensile Strength", "≥540 MPa", "—"],
                  ["Standard", "GB/T 1499.3", "BS 4483"],
                  ["Surface", "Deformed (ribbed)", "—"],
                ].map(([p, s, c]) => (
                  <tr key={p}><td className="px-4 py-3 font-medium text-zinc-300">{p}</td><td className="px-4 py-3">{s}</td><td className="px-4 py-3">{c}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="adv-heading" className="mb-12">
          <h2 id="adv-heading" className="mb-6 text-2xl font-bold text-white">Advantages of Pre-cut Floor Mesh</h2>
          <ul className="space-y-3 text-zinc-400">
            {[
              "Eliminates site bar-cutting — reduces waste and labour cost",
              "Each panel placed in 60–90 seconds vs. 15–20 minutes for loose bar tying",
              "Consistent 150mm spacing — removes human measurement error",
              "Lighter panels (compared to rebar bundles) — safer manual handling",
              "HRB400 grade provides optimal ductility for seismic applications",
              "Mill test report and material certificate per batch",
            ].map((adv) => (
              <li key={adv} className="flex gap-3"><span className="mt-0.5 text-amber-400" aria-hidden="true">✓</span><span>{adv}</span></li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="why-heading" className="mb-12 rounded-2xl border border-amber-400/20 bg-zinc-900 p-8">
          <h2 id="why-heading" className="mb-4 text-2xl font-bold text-white">Why Choose ZY Steel Floor Mesh?</h2>
          <p className="text-zinc-400">
            With {SITE.capacity} production capacity and factory-direct pricing, ZY Steel is
            Cambodia&apos;s most cost-effective source for floor slab mesh. We produce to your
            cutting schedule, label each bundle with slab zone references, and deliver to site
            in sequence — reducing crane time and placement errors.
          </p>
        </section>

        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="mb-6 text-2xl font-bold text-white">FAQ — Floor Slab Mesh</h2>
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

        <section aria-label="Quote call to action" className="rounded-2xl bg-amber-400 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-zinc-950">Request Floor Mesh Quote</h2>
          <p className="mb-6 text-zinc-800">Send your slab drawings or spec sheet — we&apos;ll produce a cutting schedule and factory-direct quote within 24 hours.</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`tel:${SITE.phone}`} className="rounded-full bg-zinc-950 px-8 py-3 font-semibold text-white hover:bg-zinc-800">{SITE.phoneDisplay}</a>
            <Link href="/contact" className="rounded-full border-2 border-zinc-950 px-8 py-3 font-semibold text-zinc-950 hover:bg-zinc-950 hover:text-white">Send Inquiry</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
