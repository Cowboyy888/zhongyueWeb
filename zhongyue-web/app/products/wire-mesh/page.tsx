import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, SITE } from "@/lib/seo";
import { productSchema, faqSchema, webPageSchema } from "@/lib/structured-data";

export const metadata: Metadata = buildMetadata({
  title: "Welded Rebar Mesh Cambodia — GB/T 1499.3 · BS 4483 · ASTM A1064",
  description:
    "Factory-direct welded rebar mesh from Cambodia. Wire 4–12mm, spacing 100–200mm. ISO 9001 · GB/T 1499.3 · BS 4483 · ASTM A1064 certified. Free quote in 24h — ZY Steel.",
  path: "/products/wire-mesh",
  keywords: [
    "welded rebar mesh Cambodia",
    "reinforcement mesh Cambodia",
    "concrete mesh Cambodia",
    "GB/T 1499.3 mesh",
    "BS 4483 mesh Cambodia",
    "ASTM A1064 mesh",
    "structural mesh supplier",
    "wire mesh manufacturer Cambodia",
  ],
});

const FAQS = [
  {
    q: "What wire diameters are available for welded rebar mesh?",
    a: "ZY Steel produces welded rebar mesh in wire diameters 4mm, 5mm, 6mm, 8mm, 10mm, and 12mm. Non-standard diameters within the 4–12mm range are available on request.",
  },
  {
    q: "What mesh spacings do you offer?",
    a: "Standard spacings are 100×100mm, 150×150mm, and 200×200mm. Custom spacings are available. Rectangular mesh (e.g., 100×200mm) is also produced.",
  },
  {
    q: "What standards does your rebar mesh meet?",
    a: "Our welded rebar mesh meets GB/T 1499.3-2010 (China), BS 4483 (UK), and ASTM A1064 (USA) standards. Mill test reports are issued with each shipment.",
  },
  {
    q: "Can you produce non-standard panel sizes?",
    a: "Yes. Standard panels are 2×4m and 2×6m. Custom lengths and widths are available with a minimum order of 5 tons per specification.",
  },
  {
    q: "What is the typical delivery time for rebar mesh?",
    a: "Standard stock items ship within 7–10 days. Custom production requires 14–21 days. Urgent orders can be expedited — contact our sales team.",
  },
];

const RELATED = [
  { href: "/products/floor-mesh", name: "Floor Slab Mesh" },
  { href: "/products/fence-mesh", name: "Welded Fence Mesh" },
  { href: "/products/custom-mesh", name: "Custom-Shape Mesh" },
  { href: "/products/wire-rod", name: "Cold-Drawn Wire & Rod" },
];

export default function WireMeshPage() {
  return (
    <main id="main-content" className="min-h-screen bg-zinc-950 px-6 py-16">
      <JsonLd
        schema={[
          webPageSchema({ title: "Welded Rebar Mesh Cambodia", description: "GB/T · BS · ASTM certified rebar mesh from Cambodia", path: "/products/wire-mesh" }),
          productSchema({
            name: "Welded Rebar Mesh",
            description: "ISO 9001 certified welded rebar mesh for structural concrete reinforcement. Wire diameter 4–12mm, spacing 100–200mm. Meets GB/T 1499.3, BS 4483, ASTM A1064.",
            image: "/images/product-1.webp",
            sku: "ZY-WRM",
            material: "HRB400 / HRB500 deformed steel bar",
            specs: {
              "Wire Diameter": "4–12mm",
              "Mesh Spacing": "100×100 / 150×150 / 200×200mm (custom available)",
              "Panel Size": "2×4m / 2×6m (custom available)",
              Standard: "GB/T 1499.3 / BS 4483 / ASTM A1064",
              Grade: "HRB400 / HRB500",
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
            { name: "Welded Rebar Mesh", href: "/products/wire-mesh" },
          ]}
        />

        {/* Overview */}
        <header className="mb-12">
          <div className="mb-3 flex flex-wrap gap-2">
            {["ISO 9001", "GB/T 1499.3", "BS 4483", "ASTM A1064"].map((c) => (
              <span key={c} className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs font-medium text-amber-400">
                {c}
              </span>
            ))}
          </div>
          <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">Welded Rebar Mesh</h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Cambodia&apos;s factory-direct welded rebar mesh. Wire diameter 4–12mm with 100–200mm
            spacing for structural concrete reinforcement in slabs, walls, pavements, and
            industrial floors. ISO 9001 certified with full mill test reports.
          </p>
        </header>

        {/* Specifications */}
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
                  ["Wire Diameter", "4 / 5 / 6 / 8 / 10 / 12mm", "Any within 4–12mm"],
                  ["Longitudinal Spacing", "100 / 150 / 200mm", "Custom"],
                  ["Transverse Spacing", "100 / 150 / 200mm", "Custom"],
                  ["Panel Length", "4m / 6m", "Up to 12m"],
                  ["Panel Width", "2m", "Up to 3m"],
                  ["Steel Grade", "HRB400", "HRB500 available"],
                  ["Tensile Strength", "≥540 MPa", "≥630 MPa (HRB500)"],
                  ["Yield Strength", "≥400 MPa", "≥500 MPa (HRB500)"],
                  ["Standard", "GB/T 1499.3", "BS 4483 / ASTM A1064"],
                  ["Surface", "Deformed (ribbed)", "Plain on request"],
                ].map(([p, s, c]) => (
                  <tr key={p}>
                    <td className="px-4 py-3 font-medium text-zinc-300">{p}</td>
                    <td className="px-4 py-3">{s}</td>
                    <td className="px-4 py-3">{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Applications */}
        <section aria-labelledby="app-heading" className="mb-12">
          <h2 id="app-heading" className="mb-6 text-2xl font-bold text-white">Applications</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Concrete Slabs", desc: "Ground-floor slabs, suspended slabs, raft foundations, pile caps." },
              { title: "Shear Walls", desc: "Vertical concrete panels in high-rise and mid-rise buildings." },
              { title: "Pavements & Roads", desc: "Highway, airport, port, and industrial hardstanding." },
              { title: "Retaining Walls", desc: "RC retaining walls, basement walls, bridge abutments." },
              { title: "Industrial Floors", desc: "Warehouse, logistics center, manufacturing plant floors." },
              { title: "Precast Elements", desc: "Factory-produced panels, beams, columns." },
            ].map((a) => (
              <div key={a.title} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
                <h3 className="mb-1 font-semibold text-white">{a.title}</h3>
                <p className="text-sm text-zinc-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section aria-labelledby="adv-heading" className="mb-12">
          <h2 id="adv-heading" className="mb-6 text-2xl font-bold text-white">Advantages</h2>
          <ul className="space-y-3 text-zinc-400">
            {[
              "Consistent weld quality — gas-shielded MIG welding at every intersection",
              "Dimensional accuracy ±3mm — no site re-measuring required",
              "Zero lap-wire defects — eliminates binding wire corrosion over time",
              "Faster installation — 40–60% labour saving vs. loose bar tying",
              "Mill test reports issued per batch — complete traceability",
              "Available in HRB400 and HRB500 grades",
            ].map((adv) => (
              <li key={adv} className="flex gap-3">
                <span className="mt-0.5 text-amber-400" aria-hidden="true">✓</span>
                <span>{adv}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why ZY Steel */}
        <section aria-labelledby="why-heading" className="mb-12 rounded-2xl border border-amber-400/20 bg-zinc-900 p-8">
          <h2 id="why-heading" className="mb-4 text-2xl font-bold text-white">Why Choose ZY Steel for Rebar Mesh?</h2>
          <p className="mb-4 text-zinc-400">
            As Cambodia&apos;s leading wire mesh manufacturer with {SITE.capacity} annual capacity,
            ZY Steel delivers consistent quality, factory-direct pricing, and the flexibility to
            fulfil both small pilot orders and large project contracts.
          </p>
          <p className="text-zinc-400">
            Our in-house laboratory tests every coil to GB/T, BS, and ASTM standards before production.
            Mill test reports, packing lists, and certificates of conformance are issued with every
            shipment — ready for structural engineer sign-off.
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="mb-12">
          <h2 id="faq-heading" className="mb-6 text-2xl font-bold text-white">FAQ — Welded Rebar Mesh</h2>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-zinc-800 bg-zinc-900 p-5">
                <h3 className="mb-2 font-semibold text-white">{q}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Products */}
        <section aria-labelledby="related-heading" className="mb-12">
          <h2 id="related-heading" className="mb-6 text-xl font-bold text-white">Related Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RELATED.map((r) => (
              <Link key={r.href} href={r.href} className="rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm font-medium text-zinc-300 transition-colors hover:border-amber-400/50 hover:text-amber-400">
                {r.name} →
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section aria-label="Quote call to action" className="rounded-2xl bg-amber-400 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-zinc-950">Request a Free Quote</h2>
          <p className="mb-6 text-zinc-800">
            Send your project specs — wire diameter, spacing, panel size, quantity — and get a
            factory-direct price within 24 hours.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={`tel:${SITE.phone}`} className="rounded-full bg-zinc-950 px-8 py-3 font-semibold text-white hover:bg-zinc-800">
              {SITE.phoneDisplay}
            </a>
            <Link href="/contact" className="rounded-full border-2 border-zinc-950 px-8 py-3 font-semibold text-zinc-950 hover:bg-zinc-950 hover:text-white">
              Send Inquiry
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
